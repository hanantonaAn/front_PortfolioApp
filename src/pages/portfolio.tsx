import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Avatar, Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import dynamic from "next/dynamic";
import { QuillFormats, QuillModules } from "@/utils/quillModule";
import 'react-quill/dist/quill.snow.css';
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import parse from 'html-react-parser';
import { useCreatePortfolioMutation, useGetAllPortfolioQuery, useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { AuthWrapper } from "@/components/layout/authWrapper";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const Portfolio = () => {

    const router = useRouter();

    const user = useAppSelector(state => state.auth.me);

    const { data: userByName } = useGetUserInfoByUsernameQuery(user?.username || '')
    
    const [createNewPortfolio] = useCreatePortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioByIdMutation();

    const createPortfolio = () => {
        if (userByName && userByName.user_portfolio) {
            updatePortfolio({
                id: userByName.user_portfolio.id,
                data: {
                    portfolio_html: value
                }
            })
            router.push(`/profile/${user?.username}`)
        } else {
            createNewPortfolio({
                portfolio_html: value
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
                                className="max-w-full mt-2"
                                formats={QuillFormats}
                                modules={QuillModules}
                                value={value}
                                onChange={setValue}
                                placeholder="Напишите свой текст здесь..."
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