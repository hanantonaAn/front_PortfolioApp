import PageLayout from "@/components/layout/pageLayout";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, ButtonGroup, Switch, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { Test } from "@/components/test";
import React from "react";
import { useGetPortfolioUsernameQuery } from "@/service/portfolioUsername";
import { PhotoModal } from "@/components/modals/photoModal";


const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}

const Profile = () => {

    const { data } = useGetPortfolioUsernameQuery('ger')

    // function extractTextFromReactElements(element: React.ReactNode): any {
    //     if (typeof element === 'string') {
    //         // Если элемент является строкой, возвращаем её
    //         return element;
    //     }

    //     if (React.isValidElement(element)) {
    //         // Если элемент является React-элементом, рекурсивно обходим его дочерние элементы
    //         return React.Children.toArray(element.props.children).reduce(
    //             (text, child) => text + extractTextFromReactElements(child),
    //             ''
    //         );
    //     }

    //     if (Array.isArray(element)) {
    //         // Если элемент является массивом, обрабатываем каждый элемент массива
    //         return element.reduce(
    //             (text, child) => text + extractTextFromReactElements(child),
    //             ''
    //         );
    //     }

    //     // Для всех остальных случаев возвращаем пустую строку
    //     return '';
    // }

    // const reactElements = userByName && userByName.user_portfolio && userByName.user_portfolio.portfolio_html && parse(userByName?.user_portfolio?.portfolio_html);
    // const text = extractTextFromReactElements(reactElements);


    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title={'userByName?.user.username'} description="Профиль" keywords="Профиль">
                    <Wrapper>
                        <div className="border-2 h-full py-12 border-r-blue-500 border-l-blue-500">
                            <div className="pb-12 flex flex-col items-center">
                                <Switch
                                    label={
                                        <div>
                                            <Typography color="blue-gray" className="font-medium">
                                                Публичность портфолио
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                Сделать портфолио публичным
                                            </Typography>
                                        </div>
                                    }
                                    className="h-full w-full checked:bg-[#2ec946]"
                                    containerProps={{
                                        className: "-mt-5 w-11 h-6",
                                    }}
                                    circleProps={{
                                        className: "before:hidden left-0.5 border-none",
                                    }}
                                />
                                <Typography variant="lead" className="mb-2 mt-3">Добавьте желаемый элемент</Typography>
                                <div>
                                    <ButtonGroup color="blue">
                                        <Button>Профиль</Button>
                                        <Button>Текстовое поле</Button>
                                        <Button>Фото</Button>
                                        <Button>Карусель</Button>
                                        <Button>Хештеги</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            {data && <PhotoModal id={data.portfolio.id} />}
                            <Test />
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Profile;