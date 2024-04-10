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

    const { data: userByName } = useGetUserInfoByUsernameQuery(postId || '')

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

    return (
        <HeadLayout title={userByName?.user.username} description="Профиль" keywords="Профиль">
            <Wrapper>
                <div className="flex gap-12 py-12 break-all">
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
                                    Языки: {userByName?.user_data?.languages && JSON.parse(userByName?.user_data?.languages as any).join(', ')}
                                </Typography>
                                <Typography className="" variant="small">
                                    Курсы: {userByName?.user_data?.curses && JSON.parse(userByName?.user_data?.curses as any).join(', ')}
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
                        {userByName && userByName.user_portfolio &&
                            <Card className="mt-12 w-full p-6">
                                {parse(userByName.user_portfolio.portfolio_html)}
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