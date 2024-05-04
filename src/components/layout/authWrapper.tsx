import { useGetUserQuery, useLazyGetUserQuery } from "@/service/projectService";
import { useGetUserDataByUserQuery, useLazyGetUserDataByUserQuery } from "@/service/userDataByUserService";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slice/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
    children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
    const dispatch = useAppDispatch();


    const [userGet, { isLoading }] = useLazyGetUserDataByUserQuery()
    const [meUser, { isLoading: isLoad }] = useLazyGetUserQuery()


    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const userData = await userGet().unwrap();
                const meData = await meUser().unwrap();
                dispatch(setUser({ user: userData, me: meData }));
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                // Обработка ошибок, если необходимо
            }
        };
    
        fetchData();
    }, [dispatch, router, userGet, meUser])


    if (isLoading || isLoad) {
        return <div>Загрузка...</div>;
    }

    return children;
};