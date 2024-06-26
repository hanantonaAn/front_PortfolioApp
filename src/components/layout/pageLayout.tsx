import { Chivo, Poppins, Inter } from 'next/font/google'
import { Footer } from '../footer';
import { Header } from '../header';
import { Chat } from '../chatBox';
import { useAppSelector } from '@/store/hooks';
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
        'bg-gray-100',
        chivo.variable, popins.variable, inter.variable, "font-chivo"];

    pageContainer.push('bg-dark');

    const componentPageContainer = pageContainer.join(' ');

    const user = useAppSelector(state => state.auth.me);
    const router = useRouter();

    return (
        <div className={componentPageContainer}>
            {user && router.pathname !== '/chat/[username]' && <Chat />}
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
        </div>
    );
}