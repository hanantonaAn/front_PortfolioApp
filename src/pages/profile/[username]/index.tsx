import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Avatar, Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import dynamic from "next/dynamic";
import { QuillFormats, QuillModules } from "@/utils/quillModule";
import 'react-quill/dist/quill.snow.css';
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import parse from 'html-react-parser';
import { useCreatePortfolioMutation, useGetAllPortfolioQuery, useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { useGetUserSkillsByUserQuery } from "@/service/usersSkillByUserService";
import { Test } from "@/components/test";
import React from "react";
import { SlSocialVkontakte } from "react-icons/sl";
import { PiTelegramLogoLight } from "react-icons/pi";
import Link from "next/link";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}

const Profile = () => {
    const [open, setOpen] = useState(false);

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

    const { data: skills } = useGetUserSkillsByUserQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });

    const user = useAppSelector(state => state.auth.me);

    const [createNewPortfolio] = useCreatePortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioByIdMutation();

    const createPortfolio = () => {
        if (userByName && userByName.user_portfolio) {
            console.log('sdfadsf')
            updatePortfolio({
                id: userByName.user_portfolio.id,
                data: {
                    portfolio_html: value
                }
            })
            setOpen(false)
        } else {
            createNewPortfolio({
                portfolio_html: value
            }).unwrap()
            setOpen(false)
        }
    };

    const [value, setValue] = useState('')

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

    const reactElements = userByName && userByName.user_portfolio && userByName.user_portfolio.portfolio_html && parse(userByName?.user_portfolio?.portfolio_html);
    const text = extractTextFromReactElements(reactElements);


    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
                    <Wrapper>
                        {/* <div className="flex gap-12 py-12 break-all">
                            {userByName &&
                                <div className="flex-1">
                                    <div className="flex gap-4">
                                        {userByName.user_data?.picture && <Avatar src={userByName.user_data.picture.replace('/', 'http://127.0.0.1:8000/')} alt="avatar" variant="rounded" size="xxl" />}
                                        <div>
                                            <Typography variant="h6">{userByName.user_data?.fullname} {userByName.user_data?.surname}</Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                Умения
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Typography variant="small">
                                            Статус: {userByName?.user_data?.status}
                                        </Typography>
                                        <Typography variant="small">
                                            Telegram: {userByName?.user_data?.contact_telegram}
                                        </Typography>
                                        <Typography variant="small">
                                            Телефон: {userByName?.user_data?.phone_number}
                                        </Typography>
                                        <Typography variant="small">
                                            E-mail: {userByName?.user_data?.contact_email}
                                        </Typography>
                                        <Typography variant="small">
                                            Город: {userByName?.user_data?.city}
                                        </Typography>
                                        <Typography variant="small">
                                            Дата рождения: {userByName?.user_data?.date_of_birth}
                                        </Typography>
                                        <Typography variant="small">
                                            Пол: {userByName?.user_data?.sex}
                                        </Typography>
                                        <Typography variant="small">
                                            Языки: {userByName?.user_data?.languages && userByName?.user_data?.languages.join(', ')}
                                        </Typography>
                                        <Typography className="" variant="small">
                                            Курсы: {userByName?.user_data?.curses && userByName?.user_data?.curses.join(', ')}
                                        </Typography>
                                        <Typography variant="small">
                                            Образование: {userByName?.user_data?.education_level}
                                        </Typography>
                                        <Typography variant="small">
                                            Учебное заведение: {userByName?.user_data?.graduation_place}
                                        </Typography>
                                        <Typography variant="small">
                                            Дата окончания: {userByName?.user_data?.graduation_date}
                                        </Typography>
                                    </div>
                                </div>
                            }
                            <div className="flex-[3]">
                                {userByName && userByName?.user_experience &&
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Typography variant="h5">
                                                Мой опыт
                                            </Typography>
                                        </div>
                                        <Card className="mt-12 w-full p-6">
                                            <Typography className="break-all">
                                                Опыт: {userByName?.user_experience?.experience && userByName?.user_experience?.experience.join(', ')}
                                            </Typography>
                                            <Typography className="break-all">
                                                Опыт работы: {userByName && experienceObj[userByName?.user_experience?.experience_years]}
                                            </Typography>
                                        </Card>
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
                                            className="max-w-full mt-2"
                                            formats={QuillFormats}
                                            modules={QuillModules}
                                            value={value}
                                            onChange={setValue}
                                            placeholder="Напишите свой текст здесь..."
                                        />
                                        <Button onClick={createPortfolio} color="light-blue" className="mt-6">Сохранить</Button>
                                    </>
                                )
                                }
                                {userByName && userByName.user_portfolio && userByName.user_portfolio.portfolio_html &&
                                    <Card className="mt-12 w-full p-6">
                                        {parse(userByName?.user_portfolio?.portfolio_html)}
                                    </Card>
                                }
                            </div>
                        </div> */}

                        <div className="bg-gray-100 mx-auto py-8">
                            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                                <div className="col-span-4 sm:col-span-3">
                                    <Card className="bg-white shadow rounded-lg p-6">
                                        <div className="flex flex-col items-center">
                                            {userByName?.user_data?.picture && <img src={userByName.user_data.picture.replace('/', 'http://127.0.0.1:8000/')} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />}
                                            <h1 className="text-xl font-bold">{userByName?.user_data?.fullname} {userByName?.user_data?.surname}</h1>
                                            <Typography variant="paragraph" className="text-gray-700">Статус: {userByName?.user_data?.status}</Typography>
                                            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Связаться</a>
                                                <Link href={`/portfolio/${userByName?.user.username}`} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Портфолио</Link>
                                            </div>
                                        </div>
                                        <hr className="my-6 border-t border-gray-300" />
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Умения</span>
                                            <ul>
                                                {skills && skills[0]?.skills?.length > 0 ?
                                                    skills[0].skills.map(item => (
                                                        <li key={item} className="mb-2">{item}</li>
                                                    ))
                                                    :
                                                    <li className="mb-2">Умения не указаны</li>
                                                }
                                            </ul>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-span-4 sm:col-span-9">
                                    <Card className="bg-white shadow rounded-lg p-6">
                                        <Typography variant="h2" className="text-xl font-bold mb-4">Обо мне</Typography>
                                        <Typography variant="paragraph" className="text-gray-700">
                                            {userByName?.user_data?.additional_info}
                                        </Typography>

                                        <h3 className="font-semibold text-center mt-3 -mb-2">
                                            Социальные сети
                                        </h3>
                                        <div className="flex justify-center items-center gap-6 my-6">
                                            <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href=""
                                                target="_blank">
                                                <SlSocialVkontakte size="24" />
                                            </a>
                                            <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href=""
                                                target="_blank">
                                                <PiTelegramLogoLight size="24" />
                                            </a>
                                        </div>

                                        <h2 className="text-xl font-bold mt-6 mb-4">Опыт</h2>
                                        {/* <div className="mb-6">
                                            <div className="flex justify-between flex-wrap gap-2 w-full">
                                                <span className="text-gray-700 font-bold">Web Developer</span>
                                                <p>
                                                    <span className="text-gray-700 mr-2">at ABC Company</span>
                                                    <span className="text-gray-700">2017 - 2019</span>
                                                </p>
                                            </div>
                                            <p className="mt-2">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                                tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                                suscipit.
                                            </p>
                                        </div> */}
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Profile;