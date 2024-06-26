import PageLayout from "@/components/layout/pageLayout";
import { useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Card, Typography } from "@material-tailwind/react";
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { useGetUserSkillsByUserQuery } from "@/service/usersSkillByUserService";
import React from "react";
import { SlSocialVkontakte } from "react-icons/sl";
import { PiTelegramLogoLight } from "react-icons/pi";
import Link from "next/link";
import { useGetUserExperienceByUserQuery } from "@/service/userExperienceByUserService";
import { useCreateNewChatMutation } from "@/service/chatService";
import toast from "react-hot-toast";


const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}

const Profile = () => {

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

    const [createChat] = useCreateNewChatMutation();

    const callWithChat = () => {
        if(user) {
            if(userByName?.user.username) {
                createChat({ username: userByName?.user.username }).unwrap()
                .then(res => {
                    router.push({pathname: `/chat/${userByName?.user.username}`, query: { id: res.id }})
                })
            }
        } else {
            toast.error('Пожалуйста, авторизуйтесь, чтобы связаться с пользователем')
        }
    };

    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
                    <Wrapper>
                        <div className="bg-gray-100 mx-auto py-8">
                            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                                <div className="col-span-4 sm:col-span-3">
                                    <Card className="bg-white shadow rounded-lg p-6">
                                        <div className="flex flex-col items-center">
                                            <img src={userByName?.user_data?.picture ? userByName.user_data.picture.replace('/', 'http://127.0.0.1:8000/') : '/assets/images/avatar_default.png'} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                            <h1 className="text-xl font-bold">{userByName?.user_data?.fullname} {userByName?.user_data?.surname}</h1>
                                            <Typography variant="paragraph" className="text-gray-700">Статус: {userByName?.user_data?.status}</Typography>
                                            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                                <button onClick={callWithChat} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Связаться</button>
                                                <Link href={`/portfolio/${userByName?.user.username}`} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Портфолио</Link>
                                            </div>
                                        </div>
                                        <hr className="my-6 border-t border-gray-300" />
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Умения</span>
                                            <ul>
                                                {userByName?.user_skills && userByName.user_skills?.skills?.length > 0 ?
                                                    userByName.user_skills?.skills.map(item => (
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
                                        {userByName?.user_experience && userByName.user_experience.map(item => {
                                            return (
                                                <div key={item.id} className="mb-6">
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
                                                </div>
                                            )
                                        })}
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