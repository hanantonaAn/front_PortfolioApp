import { SphereComponent } from "@/components/screens/portfolioScreen/sphereComponent";
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useEffect, useState } from "react";
import React from "react";
import { useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import toast from "react-hot-toast";
import { Button, Card, Tooltip } from "@material-tailwind/react";
import { IUser } from "@/types/user";
import { IPortfolioUsername } from "@/types/portfolio";
import { UserInfoSolo } from "@/types/userInfo";

type Props = {
    openEditor: boolean;
    user: IUser | null;
    portfolio: IPortfolioUsername;
    userByName: UserInfoSolo;
}

export default function PortfolioWidget({ openEditor, user, portfolio, userByName }: Props) {

    function extractTextFromReactElements(element: React.ReactNode): any {
        if (typeof element === 'string') {
            return element;
        }

        if (React.isValidElement(element)) {
            return React.Children.toArray(element.props.children).reduce(
                (text, child) => text + extractTextFromReactElements(child),
                ''
            );
        }

        if (Array.isArray(element)) {
            return element.reduce(
                (text, child) => text + extractTextFromReactElements(child),
                ''
            );
        }
        return '';
    }

    const [value, setValue] = useState('');

    const [updatePortfolio] = useUpdatePortfolioByIdMutation();

    useEffect(() => {
        if (userByName)
            setValue(userByName?.user_portfolio?.portfolio_html)
    }, [userByName])

    const createPortfolio = () => {
        const jsx = parse(value);
        toast.promise(
            updatePortfolio({
                id: userByName.user_portfolio.id,
                data: {
                    portfolio_html: value,
                    portfolio_text: extractTextFromReactElements(jsx)
                }
            }).unwrap(),
            {
                loading: 'Обновление...',
                success: () => `Портфолио успешно обновлено`,
                error: () => `Произошла ошибка`
            }
        )
    };

    return (
        <>
            <SphereComponent user={user} sphereId={portfolio?.portfolio?.sphere_id} userByName={userByName} />
            {openEditor ? (
                <>
                    <ReactQuill
                        value={value}
                        onChange={setValue}
                    />
                    <Tooltip className="!z-[10000]" content="Сохранить портфолио" placement="top">
                        <Button onClick={createPortfolio} color="light-blue" className="mt-6">Сохранить</Button>
                    </Tooltip>
                </>
            )
                :
                userByName && userByName.user_portfolio && userByName.user_portfolio.portfolio_html &&
                <Card className="mt-12 w-full p-6 ql-img">
                    {parse(userByName?.user_portfolio?.portfolio_html)}
                </Card>
            }
        </>
    )
}