import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/types/userInfo";

type Props = {
    userInfo?: UserInfo[];
    isLoading: boolean;
}

export const AdvancedSearchCardScreen = ({ userInfo, isLoading }: Props) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-12 mt-12">
            {isLoading ? (
                <>
                    {[1, 2, 3, 4, 5, 6].map(i => {
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
                userInfo && userInfo.length > 0 ? userInfo.filter(x => x.user_data.length > 0).map((item, index) => {
                    return (
                        <Card key={item.user_data[0]?.id} className="w-full h-full">
                            <CardBody className="flex gap-24">
                                <Avatar
                                    size="xxl"
                                    src={item.user_data[0]?.picture ? item.user_data[0].picture.replace('/media/', 'http://127.0.0.1:8000/media/') : '/assets/images/avatar_default.png'}
                                />
                                <div>
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
                            <CardFooter className="pt-10 flex justify-end">
                                <Link href={`/profile/${item.user.username}`}>
                                    <Button color="blue-gray">Открыть профиль</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                })
                    :
                    <Typography variant="h5">Ничего не найдено</Typography>
            )}
        </div>
    );
};