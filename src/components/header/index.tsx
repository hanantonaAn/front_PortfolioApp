import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { SiPolywork } from "react-icons/si";
import Link from "next/link";
import { ProfileMenu } from "../profileMenu";
import { useAppSelector } from "@/store/hooks";

export const Header = () => {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const user = useAppSelector(state => state.auth.me);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="/recommendations" className="flex items-center">
                    Рекомендации
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="/contacts" className="flex items-center">
                    Контакты
                </Link>
            </Typography>
        </ul>
    );

    return (
        <header className="w-full sticky top-0 z-10">
            <Navbar className="rounded-none max-w-full px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <div className="flex items-center gap-2">
                        <SiPolywork />
                        <Link
                            href="/"
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            PortfolioCamp
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        {user?.id ?
                            <ProfileMenu />
                            :
                            <div className="flex items-center gap-x-1">
                                <Link href="/login">
                                    <Button
                                        variant="text"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                    >
                                        <span>Войти</span>
                                    </Button>
                                </Link>
                                <Link href="/registration">
                                    <Button
                                        variant="gradient"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                    >
                                        <span>Регистрация</span>
                                    </Button>
                                </Link>
                            </div>
                        }
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Link className="w-full" href="/login">
                            <Button fullWidth variant="text" size="sm" className="">
                                <span>Войти</span>
                            </Button>
                        </Link>
                        <Link className="w-full" href="/registration">
                            <Button fullWidth variant="gradient" size="sm" className="">
                                <span>Регистрация</span>
                            </Button>
                        </Link>
                    </div>
                </Collapse>
            </Navbar>
        </header>
    );
}