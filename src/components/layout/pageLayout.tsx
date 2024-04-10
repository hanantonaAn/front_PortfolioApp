import { Chivo, Poppins, Inter } from 'next/font/google'
import { Footer } from '../footer';
import { Header } from '../header';
import { useGetUserQuery } from '@/service/projectService';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { setUser } from '@/store/slice/authSlice';
import { useGetUserDataByUserQuery } from '@/service/userDataByUserService';
import { useRouter } from 'next/router';

const chivo = Chivo({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-chivo",
    fallback: ['Arial', 'sans-serif']
});
const inter = Inter({
    weight: ['400', '600'],
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-inter",
    fallback: ['Arial', 'sans-serif']
});
const popins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-poppins",
    fallback: ['Arial', 'sans-serif']
})

type LayoutProps = {
    children: React.ReactNode;
};

export default function PageLayout({ children }: LayoutProps) {

    const pageContainer = ['flex', 'flex-col', 'justify-between',
        'h-screen', 'items-center', 'w-screen', 'h-full',
        'font-normal', 'text-gray', 'overflow-x-hidden',
        chivo.variable, popins.variable, inter.variable, "font-chivo"];

    pageContainer.push('bg-dark');

    const componentPageContainer = pageContainer.join(' ');

    const { data: user } = useGetUserDataByUserQuery(undefined, {
        pollingInterval: 900000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });

    const { data: getUser } = useGetUserQuery(undefined, {
        pollingInterval: 900000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && getUser) {
            dispatch(setUser({ user: user, username: getUser.username }))
        }
    }, [user, getUser, dispatch])

    return (
        <div className={componentPageContainer}>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
        </div>
    );
}