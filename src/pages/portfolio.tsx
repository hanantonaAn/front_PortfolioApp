import PageLayout from "@/components/layout/pageLayout";
import { useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { useCreatePortfolioMutation, useUpdatePortfolioByIdMutation } from "@/service/portfolioService";
import { AuthWrapper } from "@/components/layout/authWrapper";
import parse from 'html-react-parser';
const ReactQuill = dynamic(() => import('../components/textEditor'), { ssr: false });

import React from "react";
import { CarouselWidget } from "@/widgets/carouselWidget";
import { useGetPortfolioUsernameQuery } from "@/service/portfolioUsername";
import { CarouselModal } from "@/components/modals/carouselModal/carouselModal";
import { useCreateCarouselMutation, useGetImagesBySliderQuery } from "@/service/carouselService";

const Portfolio = () => {

    const router = useRouter();

    const user = useAppSelector(state => state.auth.me);

    const { data: userByName } = useGetUserInfoByUsernameQuery(user?.username || '')
    const { data: userPortfolio } = useGetPortfolioUsernameQuery(user?.username || '');


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
        const jsx = parse(value);

        if (userByName && userByName.user_portfolio) {
            updatePortfolio({
                id: userByName.user_portfolio.id,
                data: {
                    portfolio_html: value,
                    portfolio_text: extractTextFromReactElements(jsx)
                }
            })
            router.push(`/profile/${user?.username}`)
        } else {
            createNewPortfolio({
                portfolio_html: value,
                portfolio_text: extractTextFromReactElements(jsx)
            }).unwrap()
            router.push(`/profile/${user?.username}`)
        }
    };

    const [value, setValue] = useState('');


    const [createSlider] = useCreateCarouselMutation();
    const [openSlider, setOpenSlider] = useState<boolean>(false);
    const [newSlider, setNewSlider] = useState<string | undefined>(undefined);

    const handleOpenSlider = () => setOpenSlider((cur) => !cur);

    const createNewSlider = async () => {
        setNewSlider(undefined)
        if (userPortfolio?.portfolio.id) {
            const formData = new FormData();
            formData.append('coordinate_x', '0')
            formData.append('coordinate_y', '0')
            formData.append('coordinate_z', '2147483647')
            formData.append('height', '2147483647')
            formData.append('width', '2147483647')
            formData.append('portfolio_id', userPortfolio.portfolio.id);
            createSlider(formData).unwrap()
                .then(res => {
                    setNewSlider(res.id);
                    handleOpenSlider();
                })
        }
    };

    const { data } = useGetImagesBySliderQuery(newSlider);

    return (
        <AuthWrapper>
            <PageLayout>
                {newSlider && <CarouselModal allImages={data} id={newSlider} open={openSlider} handleOpen={handleOpenSlider} />}
                <HeadLayout title="Портфолио" description="Портфолио" keywords="Портфолио">
                    <Wrapper>
                        <div className="py-12 px-20 break-all">
                            <Typography variant="h4" className="text-center mb-5">Редактировать портфолио</Typography>
                            <ReactQuill
                                value={value}
                                setValue={setValue}
                            />
                            <Button onClick={createPortfolio} color="light-blue" className="mt-6">Сохранить</Button>
                            {userPortfolio && userPortfolio.slider && userPortfolio.slider ?
                                <div className="flex items-center justify-between gap-2 mt-6">
                                    <Typography variant="h5">
                                        Слайдеры
                                    </Typography>
                                    {user && user.id === userPortfolio?.user?.id &&
                                        <Tooltip className="!z-[10000]" content="Добавить новый слайдер" placement="top">
                                            <Button onClick={createNewSlider} color="blue" size="sm" variant="outlined">Добавить слайдер</Button>
                                        </Tooltip>
                                    }
                                </div>
                                :
                                <div className="flex items-center justify-between gap-2 mt-6">
                                    <Typography variant="h5">
                                        Слайдеры пока не добавлены
                                    </Typography>
                                    {user && user.id === userPortfolio?.user?.id &&
                                        <Button onClick={createNewSlider} color="blue" size="sm" variant="outlined">Добавить слайдер</Button>
                                    }
                                </div>
                            }
                            {userPortfolio && userPortfolio.slider && userPortfolio.slider.map(item => {
                                return (
                                    <CarouselWidget user={user} userPortfolio={userPortfolio} key={item.id} slider_id={item.id} />
                                )
                            })}
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Portfolio;