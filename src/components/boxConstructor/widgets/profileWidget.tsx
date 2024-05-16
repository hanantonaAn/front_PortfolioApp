import { UserDataSwitchers } from "@/components/screens/portfolioScreen/userDataSwitchers";
import { useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { IUser } from "@/types/user";
import { UserInfoSolo } from "@/types/userInfo";
import { Button, Card, Switch, Tooltip, Typography } from "@material-tailwind/react";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
    userByName: UserInfoSolo;
    user: IUser | null;
    onOpenEditor: () => void;
    openEditor: boolean;
}

export const ProfileWidget = ({ userByName, user, onOpenEditor, openEditor }: Props) => {


    const [updatePortfolio] = useUpdatePortfolioByIdMutation();


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
        <div className="col-span-4 sm:col-span-3">
            <Card className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center mb-2">
                    <Image
                        src={userByName?.user_data.picture ? userByName.user_data.picture.replace('/', 'http://127.0.0.1:8000/') : '/assets/images/avatar_default.png'}
                        width={128}
                        height={128}
                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                        alt={userByName.user_data.fullname}
                    />
                    <h1 className="text-xl font-bold">{userByName?.user_data?.fullname} {userByName?.user_data?.surname}</h1>
                    <Typography variant="paragraph" className="text-gray-700">Статус: {userByName?.user_data?.status}</Typography>
                </div>
                {(user && user.id === userByName?.user?.id) && <Button onClick={onOpenEditor} color="light-blue">Перейти в конструктор</Button>}
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Личная информация</span>
                    <UserDataSwitchers openEditor={openEditor} userByName={userByName} />
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
                </div>
            </Card>
        </div>
    );
};