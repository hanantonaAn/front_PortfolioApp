import PageLayout from "@/components/layout/pageLayout";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, ButtonGroup, Switch, Tooltip, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";
import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { useCreatePortfolioMutation, useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { CarouselModal } from "@/components/modals/carouselModal/carouselModal";
import { useGetPortfolioUsernameQuery } from "@/service/portfolioUsername";
import { useCreateCarouselMutation, useDeleteCarouselMutation, useGetImagesBySliderQuery } from "@/service/carouselService";
import toast from "react-hot-toast";
import { BoxConstructor } from "@/components/boxConstructor";
import { PhotoModal } from "@/components/modals/photoModal/photoModal";
import { IPortfolioUsername } from "@/types/portfolio";
import { useCreateTextFieldMutation } from "@/service/textFieldService";

const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}


interface GridItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static?: boolean;
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

    function extractTextFromReactElements(element: React.ReactNode): any {
        if (typeof element === 'string') {
            // Если элемент является строкой, возвращаем её
            return element;
        }

        if (React.isValidElement(element)) {
            // Если элемент является React-элементом, рекурсивно обходим его дочерние элементы
            return React.Children.toArray(element.props.children).reduce(
                (text, child) => text + extractTextFromReactElements(child),
                ''
            );
        }

        if (Array.isArray(element)) {
            // Если элемент является массивом, обрабатываем каждый элемент массива
            return element.reduce(
                (text, child) => text + extractTextFromReactElements(child),
                ''
            );
        }

        // Для всех остальных случаев возвращаем пустую строку
        return '';
    }


    const [open, setOpen] = useState(false);

    const [value, setValue] = useState('');

    const [createNewPortfolio] = useCreatePortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioByIdMutation();

    const [createNewTextField] = useCreateTextFieldMutation();

    useEffect(() => {
        if (userByName)
            setValue(userByName?.user_portfolio?.portfolio_html)
    }, [userByName])

    const createPortfolio = () => {
        const jsx = parse(value);

        if (userByName && userByName.user_portfolio) {
            toast.promise(
                updatePortfolio({
                    id: userByName.user_portfolio.id,
                    data: {
                        portfolio_html: value,
                        portfolio_text: extractTextFromReactElements(jsx)
                    }
                }).unwrap(),
                {
                    loading: 'Обновление...',
                    success: () => `Портфолио успешно обновлено`,
                    error: () => `Произошла ошибка`
                }
            ).then(() => {
                setOpen(false);
            })
        } else {
            toast.promise(
                createNewPortfolio({
                    portfolio_html: value,
                    portfolio_text: extractTextFromReactElements(jsx)
                }).unwrap(),
                {
                    loading: 'Создание...',
                    success: () => `Портфолио успешно создано`,
                    error: () => `Произошла ошибка`
                }
            ).then(() => {
                setOpen(false);
            })
        }
    };

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
            formData.append('coordinate_z', '2147483647')
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

    const keysToCombine: (keyof IPortfolioUsername)[] = ['slider', 'text'];

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

            // Добавляем первый элемент в начало массивов gridItems и layouts
            const updatedGridItems = [...(combinedArray || []), profileItem].map(item => ({
                i: item.id,
                x: item.coordinate_x,
                y: item.coordinate_y,
                w: item.width,
                h: item.height,
                type: item.type
            })) as GridItem[];

            const updatedLayouts = [profileItem, ...(combinedArray || [])].map(item => ({
                i: item.id,
                x: item.coordinate_x,
                y: item.coordinate_y,
                w: item.width,
                h: item.height,
                type: item.type
            })) as GridItem[];

            if (updatedGridItems.length > 0) {
                setGridItems(updatedGridItems);
                setLayouts(updatedLayouts);
            }
        }

    }, [userPortfolio, userByName])


    const addNewItem = () => {
        const newItem = { i: `${layouts.length}`, x: 1, y: 5, w: 5, h: 25, type: 'profile' };
        setLayouts((prevLayouts: any) => ([
            ...prevLayouts,
            newItem
        ]));
        setGridItems((prevLayouts: any) => ([
            ...prevLayouts,
            newItem
        ]));

    };

    const addNewItemTest = () => {
        const newItem = { i: `${layouts.length}`, x: 1, y: 5, w: 5, h: 25, type: 'text' };
        createNewTextField({
            portfolio_id: userPortfolio?.portfolio.id,
            value: ''
        }).unwrap()
        setLayouts((prevLayouts: any) => ([
            ...prevLayouts,
            newItem
        ]));
        setGridItems((prevLayouts: any) => ([
            ...prevLayouts,
            newItem
        ]));

    };

    const [deleteCarousel] = useDeleteCarouselMutation();

    const deleteCarouselFunc = (id: string) => {
        toast.promise(
            deleteCarousel(id).unwrap(),
            {
                loading: 'Удаление...',
                success: () => `Слайдер успешно удален`,
                error: () => `Произошла ошибка`
            }
        )
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


        return (
            <AuthWrapper>
                <PageLayout>
                    <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
                        {newSlider && <CarouselModal allImages={data} id={newSlider} open={openSlider} handleOpen={handleOpenSlider} />}
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
                                        <div>
                                            <ButtonGroup color="blue">
                                                {/* <Button onClick={addNewItem}>Профиль</Button> */}
                                                <Button onClick={addNewItemTest}>Текстовое поле</Button>
                                                <Button onClick={handleOpenPhoto}>Фото</Button>
                                                <Button onClick={createNewSlider}>Карусель</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>}
                                {data &&
                                    <PhotoModal id={newSlider}
                                        open={openPhoto}
                                        handleOpen={handleOpenPhoto}
                                    />
                                }
                                {(user && user.id === userByName?.user?.id) ||
                                    (userByName && userByName.user_portfolio.public === true) ?
                                    <div className="">
                                        {userPortfolio && layouts && gridItems &&
                                            <BoxConstructor
                                                onDelete={deleteCarouselFunc}
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
                                        {/* {userByName &&
                                        <div className="flex-1">
                                            <ProfileWidget user={user} userByName={userByName} />
                                        </div>
                                    } */}

                                        {/* {userPortfolio && userByName?.user_experience && userByName?.user_experience.length > 0 ?
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Typography variant="h5">
                                                        Мой опыт
                                                    </Typography>
                                                </div>
                                                {userByName && userByName?.user_experience.map(item => {
                                                    return (
                                                        <Card key={item.id} className="mb-3 bg-white shadow rounded-lg p-6">
                                                            <div className="flex justify-between flex-wrap gap-2 w-full">
                                                                <span className="text-gray-700 font-bold">{item.position}</span>
                                                                <p className="flex flex-col">
                                                                    <span className="text-gray-700 mr-2">Компания: {item.company}</span>
                                                                    <span className="text-gray-700">Опыт работы: {experienceObj[item.experience_years]}</span>
                                                                </p>
                                                            </div>
                                                            <p className="mt-2">
                                                                Описание: {item.experience_info}
                                                            </p>
                                                        </Card>
                                                    )
                                                })}
                                            </div>
                                            :
                                            <div className="flex items-center justify-between gap-2">
                                                <Typography variant="h5">
                                                    Опыт не добавлен
                                                </Typography>
                                            </div>
                                        } */}
                                        {/* {userByName && userByName.user_portfolio ?
                                            <div className="flex items-center justify-between gap-2 mt-6">
                                                <Typography variant="h5">
                                                    Мое портфолио
                                                </Typography>
                                                {user && user.id === userByName?.user?.id &&
                                                    <Tooltip className="!z-[10000]" content="Изменить портфолио" placement="top">
                                                        <Button onClick={() => setOpen(prev => !prev)} color="blue" size="sm" variant="outlined">Изменить</Button>
                                                    </Tooltip>
                                                }
                                            </div>
                                            :
                                            <div className="flex items-center gap-2 mt-6">
                                                <Typography variant="h5">
                                                    Портфолио пока не добавлено
                                                </Typography>
                                                {user && user.id === userByName?.user?.id &&
                                                    <Tooltip className="!z-[10000]" content="Создать портфолио" placement="top">
                                                        <Button onClick={() => setOpen(prev => !prev)} color="blue" size="sm" variant="outlined">Добавить</Button>
                                                    </Tooltip>
                                                }
                                            </div>
                                        } */}
                                        {/* {userPortfolio && userByName && <SphereComponent user={user} sphereId={userPortfolio?.portfolio?.sphere_id} userByName={userByName} />} */}
                                        {/* {open && (
                                            <>
                                                <ReactQuill
                                                    value={value}
                                                    setValue={setValue}
                                                />
                                                <Tooltip className="!z-[10000]" content="Сохранить портфолио" placement="top">
                                                    <Button onClick={createPortfolio} color="light-blue" className="mt-6">Сохранить</Button>
                                                </Tooltip>
                                            </>
                                        )
                                        } */}
                                        {/* {userByName && userByName.user_portfolio && userByName.user_portfolio.portfolio_html &&
                                            <Card className="mt-12 w-full p-6 ql-img">
                                                {parse(userByName?.user_portfolio?.portfolio_html)}
                                            </Card>
                                        } */}
                                        {/* {userPortfolio && userPortfolio.slider && userPortfolio.slider ?
                                            <div className="flex items-center justify-between gap-2 mt-6">
                                                <Typography variant="h5">
                                                    Слайдеры
                                                </Typography>
                                                {user && user.id === userPortfolio?.user?.id &&
                                                    <Tooltip className="!z-[10000]" content="Добавить новый слайдер" placement="top">
                                                        <Button onClick={createNewSlider} color="blue" size="sm" variant="outlined">Добавить слайдер</Button>
                                                    </Tooltip>
                                                }
                                            </div>
                                            :
                                            <div className="flex items-center justify-between gap-2 mt-6">
                                                <Typography variant="h5">
                                                    Слайдеры пока не добавлены
                                                </Typography>
                                                {user && user.id === userPortfolio?.user?.id &&
                                                    <Button onClick={createNewSlider} color="blue" size="sm" variant="outlined">Добавить слайдер</Button>
                                                }
                                            </div>
                                        } */}
                                        {/* {userPortfolio && userPortfolio.slider && userPortfolio.slider.map(item => {
                                            return (
                                                <CarouselWidget user={user} userPortfolio={userPortfolio} key={item.id} slider_id={item.id} />
                                            )
                                        })} */}
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