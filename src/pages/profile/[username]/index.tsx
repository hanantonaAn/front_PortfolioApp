import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import dynamic from "next/dynamic";
import { QuillFormats, QuillModules } from "@/utils/quillModule";
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const Profile = () => {
    const [open, setOpen] = useState(false);
    return (
        <Wrapper>
            <div className="flex gap-12 py-12">
                <div className="flex-1">
                    <div className="flex gap-4">
                        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" size="xxl" />
                        <div>
                            <Typography variant="h6">Имя фамилия</Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                Умения
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography variant="small">
                            Статус: Статус
                        </Typography>
                        <Typography variant="small">
                            Telegram: Telegram
                        </Typography>
                        <Typography variant="small">
                            Телефон: Телефон
                        </Typography>
                        <Typography variant="small">
                            E-mail: @mail
                        </Typography>
                        <Typography variant="small">
                            Город: Город
                        </Typography>
                        <Typography variant="small">
                            Дата рождения: 00.00.0000
                        </Typography>
                        <Typography variant="small">
                            Пол: Муж
                        </Typography>
                        <Typography variant="small">
                            Языки: Русский
                        </Typography>
                        <Typography variant="small">
                            Курсы: Курсы
                        </Typography>
                        <Typography variant="small">
                            Образование: Образование
                        </Typography>
                        <Typography variant="small">
                            Учебное заведение: Учебное заведение
                        </Typography>
                        <Typography variant="small">
                            Дата окончания: Дата окончания
                        </Typography>
                    </div>
                </div>
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