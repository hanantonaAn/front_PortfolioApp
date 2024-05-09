import PageLayout from "@/components/layout/pageLayout";
import { useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Button } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { useCreatePortfolioMutation, useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { AuthWrapper } from "@/components/layout/authWrapper";
const ReactQuill = dynamic(() => import('../components/textEditor'), { ssr: false });

import React from "react";

const Portfolio = () => {

    const router = useRouter();

    const user = useAppSelector(state => state.auth.me);

    const { data: userByName } = useGetUserInfoByUsernameQuery(user?.username || '')

    const [createNewPortfolio] = useCreatePortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioByIdMutation();

    useEffect(() => {
        if (userByName)
            setValue(userByName?.user_portfolio?.portfolio_html)
    }, [userByName])


    function extractTextFromReactElements(element: React.ReactNode): any {
        if (typeof element === 'string') {
            // Если элемент является строкой, возвращаем её
            return element;
        }

        if (React.isValidElement(element)) {
            // Если элемент является React-элементом, рекурсивно обходим его дочерние элементы
            return React.Children.toArray(element.props.children).reduce(
                (text, child) => text + extractTextFromReactElements(child),
                ''
            );
        }

        if (Array.isArray(element)) {
            // Если элемент является массивом, обрабатываем каждый элемент массива
            return element.reduce(
                (text, child) => text + extractTextFromReactElements(child),
                ''
            );
        }

        // Для всех остальных случаев возвращаем пустую строку
        return '';
    }

    const createPortfolio = () => {
        if (userByName && userByName.user_portfolio) {
            updatePortfolio({
                id: userByName.user_portfolio.id,
                data: {
                    portfolio_html: value,
                    portfolio_text: extractTextFromReactElements(value)
                }
            })
            router.push(`/profile/${user?.username}`)
        } else {
            createNewPortfolio({
                portfolio_html: value,
                portfolio_text: extractTextFromReactElements(value)
            }).unwrap()
            router.push(`/profile/${user?.username}`)
        }
    };

    const [value, setValue] = useState('')

    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title="Портфолио" description="Портфолио" keywords="Портфолио">
                    <Wrapper>
                        <div className="py-12 break-all">
                            <ReactQuill
                                value={value}
                                setValue={setValue}
                            />
                            <Button onClick={createPortfolio} color="light-blue" className="mt-6">Сохранить</Button>
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Portfolio;