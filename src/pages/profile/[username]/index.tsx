import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import dynamic from "next/dynamic";
import { QuillFormats, QuillModules } from "@/utils/quillModule";
import 'react-quill/dist/quill.snow.css';
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

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

    const { data: userByName } = useGetUserInfoByUsernameQuery(postId || '')

    return (
        <Wrapper>
            <div className="flex gap-12 py-12">
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
                                Статус: {userByName.user_data.status}
                            </Typography>
                            <Typography variant="small">
                                Telegram: {userByName.user_data.contact_telegram}
                            </Typography>
                            <Typography variant="small">
                                Телефон: {userByName.user_data.phone_number}
                            </Typography>
                            <Typography variant="small">
                                E-mail: {userByName.user_data.contact_email}
                            </Typography>
                            <Typography variant="small">
                                Город: {userByName.user_data.city}
                            </Typography>
                            <Typography variant="small">
                                Дата рождения: {userByName.user_data.date_of_birth}
                            </Typography>
                            <Typography variant="small">
                                Пол: {userByName.user_data.sex}
                            </Typography>
                            <Typography variant="small">
                                Языки: {userByName.user_data.languages}
                            </Typography>
                            <Typography variant="small">
                                Курсы: {userByName.user_data.curses}
                            </Typography>
                            <Typography variant="small">
                                Образование: {userByName.user_data.education_level}
                            </Typography>
                            <Typography variant="small">
                                Учебное заведение: {userByName.user_data.graduation_place}
                            </Typography>
                            <Typography variant="small">
                                Дата окончания: {userByName.user_data.graduation_date}
                            </Typography>
                        </div>
                    </div>
                }
                <div className="flex-[3]">
                    <div className="flex items-center gap-2">
                        <Typography variant="h5">
                            Мое портфолио
                        </Typography>
                        <IconButton onClick={() => setOpen(prev => !prev)} variant="text" >
                            <FaEdit />
                        </IconButton>
                    </div>
                    {open &&
                        <ReactQuill
                            className="max-w-full mt-2"
                            formats={QuillFormats}
                            modules={QuillModules}
                            // value={value}
                            // onChange={setValue}
                            placeholder="Напишите свой текст здесь..."
                        />}
                    <Card className="mt-12 w-96">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img
                                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                UI/UX Review Check
                            </Typography>
                            <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button>Read More</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Wrapper>
    );
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <HeadLayout title="Профиль" description="Профиль" keywords="Профиль">
            <PageLayout>{page}</PageLayout>
        </HeadLayout>
    )
}

export default Profile;