import { useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { useGetAllSpheraQuery } from "@/service/spheraService";
import { ISphere } from "@/types/sphere";
import { IUser } from "@/types/user";
import { UserInfoSolo } from "@/types/userInfo";
import { Option, Select, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    userByName: UserInfoSolo;
    user: IUser;
}

export const SphereComponent = ({ userByName, user }: Props) => {

    const { data: allSphere } = useGetAllSpheraQuery(undefined);

    const [updatePortfolio] = useUpdatePortfolioByIdMutation();


    const [sphere, setSphere] = useState<string | undefined>(userByName.user_portfolio.sphere_id);

    useEffect(() => {
        if (sphere != userByName.user_portfolio.sphere_id) {
            toast.promise(
                updatePortfolio({
                    id: userByName.user_portfolio.id,
                    data: {
                        sphere_id: sphere
                    }
                }),
                {
                    loading: 'Изменение...',
                    success: () => `Сфера изменена`,
                    error: () => `Произошла ошибка`
                }
            )
        }
    }, [sphere])

    return (
        <div className="flex items-center gap-5 mt-6">
            {userByName.user_portfolio.sphere_id ? 
            <Typography variant="lead">
                Сфера деятельности
            </Typography>
            :
            <Typography variant="lead">
                Сфера деятельности не указана
            </Typography>}
            {user && user.id === userByName?.user?.id && allSphere &&
                <Tooltip className="!z-[10000]" content="Изменить сферу" placement="top">
                    <div className="w-32">
                        <Select
                            label="Выбрать сферу"
                            value={sphere}
                            onChange={(val) => setSphere(val)}
                        >
                            {allSphere.map(item => {
                                return (
                                    <Option value={item.id} key={item.id}>{item.sphere}</Option>
                                )
                            })}
                        </Select>
                    </div>
                </Tooltip>
            }
        </div>
    );
};