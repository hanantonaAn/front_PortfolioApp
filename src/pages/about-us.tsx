import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Button, Card } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";

const AboutUs = () => {
    return (
        <AuthWrapper>
            <PageLayout>
                <div className="bg-gray-100 min-h-screen">
                    <section className="py-20 bg-gray-100">
                        <div className="container mx-auto px-6">
                            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">О нас</h2>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-1/2 p-6">
                                    <Card className="bg-white shadow-lg rounded-lg p-6">
                                        <img
                                            className="h-48 w-full object-cover object-center mb-4"
                                            src="https://via.placeholder.com/150"
                                            alt="Преимущество 1"
                                        />
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">Преимущество 1</h3>
                                        <p className="text-gray-500">Описание преимущества 1.</p>
                                    </Card>
                                </div>
                                <div className="w-full lg:w-1/2 p-6">
                                    <Card className="bg-white shadow-lg rounded-lg p-6">
                                        <img
                                            className="h-48 w-full object-cover object-center mb-4"
                                            src="https://via.placeholder.com/150"
                                            alt="Преимущество 2"
                                        />
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">Преимущество 2</h3>
                                        <p className="text-gray-500">Описание преимущества 2.</p>
                                    </Card>
                                </div>
                                <div className="w-full lg:w-1/2 p-6">
                                    <Card className="bg-white shadow-lg rounded-lg p-6">
                                        <img
                                            className="h-48 w-full object-cover object-center mb-4"
                                            src="https://via.placeholder.com/150"
                                            alt="Преимущество 3"
                                        />
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">Преимущество 3</h3>
                                        <p className="text-gray-500">Описание преимущества 3.</p>
                                    </Card>
                                </div>
                                <div className="w-full lg:w-1/2 p-6">
                                    <Card className="bg-white shadow-lg rounded-lg p-6">
                                        <img
                                            className="h-48 w-full object-cover object-center mb-4"
                                            src="https://via.placeholder.com/150"
                                            alt="Преимущество 4"
                                        />
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">Преимущество 4</h3>
                                        <p className="text-gray-500">Описание преимущества 4.</p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageLayout>
        </AuthWrapper>
    );
}

AboutUs.getLayout = function getLayout(page: ReactElement) {
    return (
        <HeadLayout title="Профиль" description="Профиль" keywords="Профиль">
            {page}
        </HeadLayout>
    )
}

export default AboutUs;