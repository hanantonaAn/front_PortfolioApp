import { useGetUserQuery } from "@/service/projectService";
import { useGetUserDataByUserQuery } from "@/service/userDataByUserService";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slice/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
    children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
    const dispatch = useAppDispatch();


    const { data: user, isLoading } = useGetUserDataByUserQuery(undefined, {skip: false});

    const { data: getUser, isLoading: isLoad } = useGetUserQuery(undefined, {skip: false})


    const router = useRouter();

    useEffect(() => {
        if(user && getUser) {
            console.log('sdfsdf')
            dispatch(setUser({ user: user, me: getUser}))
        }
    }, [getUser, user, dispatch, router])

    if (isLoading || isLoad) {
        return <div>Загрузка...</div>;
    }

    return children;
};