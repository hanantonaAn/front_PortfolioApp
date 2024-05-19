import PageLayout from "@/components/layout/pageLayout";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, ButtonGroup, Switch, Tooltip, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";
import React, { useEffect, useState } from "react";
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { CarouselModal } from "@/components/modals/carouselModal/carouselModal";
import { useGetPortfolioUsernameQuery } from "@/service/portfolioUsername";
import { useCreateCarouselMutation, useGetImagesBySliderQuery } from "@/service/carouselService";
import toast from "react-hot-toast";
import { BoxConstructor } from "@/components/boxConstructor";
import { PhotoModal } from "@/components/modals/photoModal/photoModal";
import { IPortfolioUsername } from "@/types/portfolio";
import { useCreateTextFieldMutation } from "@/service/textFieldService";
import { ExperienceModal } from "@/components/modals/experienceModal";


interface GridItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
    picture?: string;
    position?: string;
    experience_years?: string;
    company?: string;
    experience_info?: string;
    type?: string;
    isResizable?: boolean;
}

const Profile = () => {

    const router = useRouter();

    const [postId, setPostId] = useState<string | null>(null);

    const [editor, setEditor] = useState<boolean>(false);
    const openEditor = () => {
        setEditor(prev => !prev)
    };

    useEffect(() => {
        if (router.isReady) {
            // Проверяем, что router.query.id не undefined, прежде чем передавать его в setPostId
            if (router.query.username) {
                setPostId(router.query.username as string); // Приводим к типу string, так как мы уверены, что это строка
            }
        }
    }, [router.isReady, router.query.username]);
    const { data: userByName } = useGetUserInfoByUsernameQuery(postId || '');
    const { data: userPortfolio } = useGetPortfolioUsernameQuery(postId || '');

    const user = useAppSelector(state => state.auth.me);


    const [openPhoto, setOpenPhoto] = useState<boolean>(false);

    const handleOpenPhoto = () => setOpenPhoto((cur) => !cur);

    const [createNewTextField] = useCreateTextFieldMutation();
    const [updatePortfolio] = useUpdatePortfolioByIdMutation();


    const [createSlider] = useCreateCarouselMutation();
    const [openSlider, setOpenSlider] = useState<boolean>(false);
    const [newSlider, setNewSlider] = useState<string | undefined>(undefined);

    const handleOpenSlider = () => setOpenSlider((cur) => !cur);

    const createNewSlider = async () => {
        setNewSlider(undefined)
        if (userPortfolio?.portfolio.id) {
            const formData = new FormData();
            formData.append('coordinate_x', '1')
            formData.append('coordinate_y', '2')
            formData.append('coordinate_z', '2')
            formData.append('height', '5')
            formData.append('width', '5')
            formData.append('portfolio_id', userPortfolio.portfolio.id);
            createSlider(formData).unwrap()
                .then(res => {
                    setNewSlider(res.id);
                    handleOpenSlider();
                })
        }
    };

    const { data } = useGetImagesBySliderQuery(newSlider);

    const keysToCombine: (keyof IPortfolioUsername)[] = ['slider', 'text', 'photo'];

    const [gridItems, setGridItems] = useState<GridItem[]>([]);

    const [layouts, setLayouts] = useState<GridItem[]>([]);

    useEffect(() => {
        if (userPortfolio && userByName) {
            const existingKeys = userPortfolio && keysToCombine.filter(key => userPortfolio[key]);

            const combinedArray = existingKeys && existingKeys.flatMap(key => {
                const items = userPortfolio[key];
                return items.map((item: any) => ({ type: key, ...item }));
            });

            const profileItem = {
                id: userByName?.user_data.id,
                coordinate_x: userByName?.user_data.coordinate_x,
                coordinate_y: userByName?.user_data.coordinate_y,
                width: userByName?.user_data.width,
                height: userByName?.user_data.height,
                type: 'profile'
            };

            const userExperience = userPortfolio.user_experience?.filter(x => x.show).map(item => {
                return {
                    id: item.id,
                    coordinate_x: item.coordinate_x,
                    coordinate_y: item.coordinate_y,
                    width: item.width,
                    height: item.height,
                    position: item.position,
                    experience_years: item.experience_years,
                    company: item.company,
                    experience_info: item.experience_info,
                    type: 'user_experience'
                }
            })

            // const portfolioItem = {
            //     id: userPortfolio.portfolio.id,
            //     coordinate_x: userPortfolio?.portfolio.coordinate_x,
            //     coordinate_y: userPortfolio?.portfolio.coordinate_y,
            //     width: userPortfolio?.portfolio.width,
            //     height: userPortfolio?.portfolio.height,
            //     type: 'profile'
            // }

            // Добавляем первый элемент в начало массивов gridItems и layouts
            const updatedGridItems = [profileItem, ...(combinedArray || []), ...(userExperience || [])].map(item => ({
                i: item.id,
                x: item.coordinate_x,
                y: item.coordinate_y,
                w: item.width,
                h: item.height,
                type: item.type
            })) as GridItem[];


            const updatedLayouts = [profileItem, ...(combinedArray || []), ...(userExperience || [])].map(item => {
                const layoutItem: GridItem & { picture?: string } = {
                    i: item.id,
                    x: item.coordinate_x,
                    y: item.coordinate_y,
                    w: item.width,
                    h: item.height,
                    type: item.type
                };
                // Если тип элемента - 'photo', добавляем picture
                if (item.type === 'photo') {
                    layoutItem.picture = item.picture;
                }
                if(item.type === 'user_experience') {
                    layoutItem.company = item.company;
                    layoutItem.experience_info = item.experience_info;
                    layoutItem.experience_years = item.experience_years;
                    layoutItem.position = item.position;
                }
                return layoutItem;
            }) as GridItem[];

            if (updatedGridItems.length > 0) {
                setGridItems(updatedGridItems);
                setLayouts(updatedLayouts);
            }
        }

    }, [userPortfolio, userByName])


    const addNewItemTest = () => {
        createNewTextField({
            portfolio_id: userPortfolio?.portfolio.id,
            value: '',
            width: 5,
            height: 5,
            coordinate_x: 7,
            coordinate_y: 7
        }).unwrap()
    };


    const updatePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        if (userByName && userByName.user_portfolio) {
            toast.promise(
                updatePortfolio({
                    id: userByName.user_portfolio.id,
                    data: {
                        public: isChecked,
                    }
                }),
                {
                    loading: 'Изменение...',
                    success: () => `Видимость портфолио успешно изменено`,
                    error: () => `Произошла ошибка`
                }
            )
        }
    };


    const [openExperience, setOpenExperience] = useState<boolean>(false);
    const handleOpenExperience = () => setOpenExperience((cur) => !cur);


    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
                    {newSlider && <CarouselModal allImages={data} id={newSlider} open={openSlider} handleOpen={handleOpenSlider} />}
                    {userPortfolio && <ExperienceModal portfolio={userPortfolio} open={openExperience} handleOpen={handleOpenExperience} />}
                    <Wrapper>
                        <div className={`py-12 h-full" ${editor ? "border-2 border-r-blue-500 border-l-blue-500" : ""}`}>
                            {editor &&
                                <div className="pb-12 flex flex-col items-center">
                                    {(user && user.id === userByName?.user?.id) &&
                                        <Tooltip className="!z-[10000]" content="Вы уверены, что хотите поменять видимость публичность?" placement="top">
                                            <Switch
                                                checked={userByName.user_portfolio.public}
                                                onChange={updatePublic}
                                                label={
                                                    <div>
                                                        <Typography color="blue-gray" className="font-medium">
                                                            Публичность портфолио
                                                        </Typography>
                                                        <Typography variant="small" color="gray" className="font-normal">
                                                            Сделать портфолио публичным
                                                        </Typography>
                                                    </div>
                                                }
                                                className="h-full w-full checked:bg-[#2ec946]"
                                                containerProps={{
                                                    className: "w-11 h-6",
                                                }}
                                                circleProps={{
                                                    className: "before:hidden left-0.5 border-none",
                                                }}
                                            />
                                        </Tooltip>
                                    }
                                    <Typography variant="lead" className="mb-2 mt-3">Добавьте желаемый элемент</Typography>
                                    <Button onClick={openEditor} color="red">Закрыть конструктор</Button>
                                    <div className="mt-2">
                                        <ButtonGroup color="blue">
                                            <Button onClick={addNewItemTest}>Текстовое поле</Button>
                                            <Button onClick={handleOpenPhoto}>Фото</Button>
                                            <Button onClick={createNewSlider}>Карусель</Button>
                                            <Button onClick={handleOpenExperience}>Опыт</Button>
                                            {/* <Button>Умения</Button> */}
                                        </ButtonGroup>
                                    </div>
                                </div>}
                            <PhotoModal id={userPortfolio?.portfolio.id}
                                open={openPhoto}
                                handleOpen={handleOpenPhoto}
                            />
                            {(user && user.id === userByName?.user?.id) ||
                                (userByName && userByName.user_portfolio?.public === true) ?
                                <div className="">
                                    {userPortfolio && layouts && gridItems &&
                                        <BoxConstructor
                                            userByName={userByName}
                                            user={user}
                                            portfolio={userPortfolio}
                                            layouts={layouts}
                                            setLayouts={setLayouts}
                                            gridItems={gridItems}
                                            setGridItems={setGridItems}
                                            openEditor={editor}
                                            onOpenEditor={openEditor}
                                        />}
                                </div>
                                :
                                <Typography color="blue-gray" className="flex items-center justify-center h-screen" variant="h1">Портфолио не является публичным</Typography>
                            }
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Profile;