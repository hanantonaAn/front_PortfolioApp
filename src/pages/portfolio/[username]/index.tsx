import PageLayout from "@/components/layout/pageLayout";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";
import React, { useEffect, useState } from "react";
import { useGetPortfolioUsernameQuery } from "@/service/portfolioUsername";
import dynamic from "next/dynamic";
import parse from 'html-react-parser';
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { FaEdit } from "react-icons/fa";
import { useCreatePortfolioMutation, useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
const ReactQuill = dynamic(() => import('../../../components/textEditor'), { ssr: false });


const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}

const Profile = () => {

    const { data } = useGetPortfolioUsernameQuery('ger')

    const router = useRouter();

    const [postId, setPostId] = useState<string | null>(null);

    useEffect(() => {
        if (router.isReady) {
            // Проверяем, что router.query.id не undefined, прежде чем передавать его в setPostId
            if (router.query.username) {
                setPostId(router.query.username as string); // Приводим к типу string, так как мы уверены, что это строка
            }
        }
    }, [router.isReady, router.query.username]);
    const { data: userByName } = useGetUserInfoByUsernameQuery(postId || '');
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

    useEffect(() => {
        if (userByName)
            setValue(userByName?.user_portfolio?.portfolio_html)
    }, [userByName])

    const createPortfolio = () => {
        if (userByName && userByName.user_portfolio) {
            updatePortfolio({
                id: userByName.user_portfolio.id,
                data: {
                    portfolio_html: value,
                    portfolio_text: extractTextFromReactElements(value)
                }
            })
            setOpen(false)
        } else {
            createNewPortfolio({
                portfolio_html: value,
                portfolio_text: extractTextFromReactElements(value)
            }).unwrap()
            setOpen(false)
        }
    };

    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
                    <Wrapper>
                        {/* <div className="border-2 h-full py-12 border-r-blue-500 border-l-blue-500">
                            <div className="pb-12 flex flex-col items-center">
                                <Switch
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
                                        className: "-mt-5 w-11 h-6",
                                    }}
                                    circleProps={{
                                        className: "before:hidden left-0.5 border-none",
                                    }}
                                />
                                <Typography variant="lead" className="mb-2 mt-3">Добавьте желаемый элемент</Typography>
                                <div>
                                    <ButtonGroup color="blue">
                                        <Button>Профиль</Button>
                                        <Button>Текстовое поле</Button>
                                        <Button onClick={handleOpenPhoto}>Фото</Button>
                                        <Button>Карусель</Button>
                                        <Button>Хештеги</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            {data &&
                                <PhotoModal id={data.portfolio.id}
                                    open={openPhoto}
                                    handleOpen={handleOpenPhoto}
                                />
                            }
                            <Test />
                        </div> */}
                        <div className="flex gap-12 py-12 break-all">
                            {userByName &&
                                <div className="flex-1">
                                    <div className="col-span-4 sm:col-span-3">
                                        <Card className="bg-white shadow rounded-lg p-6">
                                            <div className="flex flex-col items-center">
                                                <img src={userByName?.user_data.picture ? userByName.user_data.picture.replace('/', 'http://127.0.0.1:8000/') : '/assets/images/avatar_default.png'} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                                <h1 className="text-xl font-bold">{userByName?.user_data?.fullname} {userByName?.user_data?.surname}</h1>
                                                <Typography variant="paragraph" className="text-gray-700">Статус: {userByName?.user_data?.status}</Typography>

                                            </div>
                                            <hr className="my-6 border-t border-gray-300" />
                                            <div className="flex flex-col">
                                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Личная информация</span>
                                                <ul>

                                                    <li className="mb-2">Статус: {userByName?.user_data?.status}</li>
                                                    <li className="mb-2">Telegram: {userByName?.user_data?.contact_telegram}</li>
                                                    <li className="mb-2">Телефон: {userByName?.user_data?.phone_number}</li>
                                                    <li className="mb-2">E-mail: {userByName?.user_data?.contact_email}</li>
                                                    <li className="mb-2">Город: {userByName?.user_data?.city}</li>
                                                    <li className="mb-2">Дата рождения: {userByName?.user_data?.date_of_birth}</li>
                                                    <li className="mb-2">Пол: {userByName?.user_data?.sex}</li>
                                                    <li className="mb-2">Языки: {userByName?.user_data?.languages && userByName?.user_data?.languages.join(', ')}</li>
                                                    <li className="mb-2">Курсы: {userByName?.user_data?.curses && userByName?.user_data?.curses.join(', ')}</li>
                                                    <li className="mb-2">Образование: {userByName?.user_data?.education_level}</li>
                                                    <li className="mb-2">Учебное заведение: {userByName?.user_data?.graduation_place}</li>
                                                    <li className="mb-2">Дата окончания: {userByName?.user_data?.graduation_date}</li>
                                                </ul>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            }
                            <div className="flex-[3]">
                                {userByName && userByName?.user_experience && userByName?.user_experience.length > 0 ?
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
                                    <div className="flex items-center gap-2">
                                        <Typography variant="h5">
                                            Опыт не добавлен
                                        </Typography>
                                    </div>
                                }
                                {userByName && userByName.user_portfolio ?
                                    <div className="flex items-center gap-2 mt-6">
                                        <Typography variant="h5">
                                            Мое портфолио
                                        </Typography>
                                        {user && user.id === userByName?.user?.id && <IconButton onClick={() => setOpen(prev => !prev)} variant="text" >
                                            <FaEdit />
                                        </IconButton>}
                                    </div>
                                    :
                                    <div className="flex items-center gap-2 mt-6">
                                        <Typography variant="h5">
                                            Портфолио пока не добавлено
                                        </Typography>
                                        {user && user.id === userByName?.user?.id && <IconButton onClick={() => setOpen(prev => !prev)} variant="text" >
                                            <FaEdit />
                                        </IconButton>}
                                    </div>
                                }
                                {open && (
                                    <>
                                        <ReactQuill
                                            value={value}
                                            setValue={setValue}
                                        />
                                        <Button onClick={createPortfolio} color="light-blue" className="mt-6">Сохранить</Button>
                                    </>
                                )
                                }
                                {userByName && userByName.user_portfolio && userByName.user_portfolio.portfolio_html &&
                                    <Card className="mt-12 w-full p-6 ql-img">
                                        {parse(userByName?.user_portfolio?.portfolio_html)}
                                    </Card>
                                }
                            </div>
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Profile;