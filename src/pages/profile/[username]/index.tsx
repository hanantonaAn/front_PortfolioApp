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
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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

    const user = useAppSelector(state => state.auth.user);


    const { data: portfolio } = useGetAllPortfolioQuery();

    const [createNewPortfolio] = useCreatePortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioByIdMutation();

    const createPortfolio = () => {
        if (portfolio && portfolio.length > 0) {
            console.log('sdfadsf')
            updatePortfolio({
                id: portfolio[0].id,
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

    return (
        <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
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
                            {user && <IconButton onClick={() => setOpen(prev => !prev)} variant="text" >
                                <FaEdit />
                            </IconButton>}
                        </div>
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
                        {portfolio && portfolio.length > 0 && 
                        <Card className="mt-12 w-full p-6">
                            {parse(portfolio[0].portfolio_html)}
                        </Card>
                        }
                    </div>
                </div>
            </Wrapper>
        </HeadLayout>
    );
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <PageLayout>{page}</PageLayout>
    )
}

export default Profile;