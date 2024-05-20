import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/types/userInfo";

type Props = {
    userInfo?: UserInfo[];
    isLoading: boolean;
}

export const HomeCardScreen = ({ userInfo, isLoading }: Props) => {
    return (
        <div className="grid grid-cols-3 gap-6 mt-12">
            {isLoading ? (
                <>
                    {[1, 2, 3].map(i => {
                        return (
                            <Card key={i} className="w-full">
                                <CardHeader color="blue-gray" className="relative h-56 bg-gray-200 animate-pulse">{null}</CardHeader>
                                <CardBody className="bg-white">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                </CardBody>
                                <CardFooter className="pt-0 mt-auto bg-white p-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </>
            ) : (
                userInfo && userInfo.filter(x => x.user.username === "hello_11" || x.user.username === "hello_22" || x.user.username === "hello_33").map((item, index) => {
                    if (index < 3) {
                        return (
                            <Card key={item.user_data[0]?.id} className="w-full">
                                <CardBody>
                                    <Avatar
                                        size="xl"
                                        src={item.user_data[0]?.picture ? item.user_data[0].picture.replace('/media/', 'http://127.0.0.1:8000/media/') : '/assets/images/avatar_default.png'}
                                    />
                                    <div className="mt-5">
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {item.user_data[0]?.fullname} {item.user_data[0]?.lastname}
                                        </Typography>
                                        <Typography>
                                            Уровень образования: {item.user_data[0]?.education_level}
                                        </Typography>
                                        <Typography>
                                            Город: {item.user_data[0]?.city}
                                        </Typography>
                                        <Typography>
                                            Пол: {item.user_data[0]?.sex === 'male' ? 'Мужской' : 'Женский'}
                                        </Typography>
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0 mt-auto">
                                    <Link href={`/profile/${item.user.username}`}>
                                        <Button>Открыть профиль</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        )
                    }
                })
            )}
        </div>
    );
};