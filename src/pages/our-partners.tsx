import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Button, Card } from "@material-tailwind/react";

const OurPartners = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                <Card className="bg-white shadow-lg rounded-lg p-6">
                    <img
                        className="h-48 w-full object-cover object-center"
                        src="https://via.placeholder.com/150"
                        alt="Partner 1"
                    />
                    <h2 className="text-xl font-bold text-gray-700 mt-4">Партнер 1</h2>
                    <p className="text-gray-500 mt-2">Описание партнера 1.</p>
                </Card>
                <Card className="bg-white shadow-lg rounded-lg p-6">
                    <img
                        className="h-48 w-full object-cover object-center"
                        src="https://via.placeholder.com/150"
                        alt="Partner 2"
                    />
                    <h2 className="text-xl font-bold text-gray-700 mt-4">Партнер 2</h2>
                    <p className="text-gray-500 mt-2">Описание партнера 2.</p>
                </Card>
                <Card className="bg-white shadow-lg rounded-lg p-6">
                    <img
                        className="h-48 w-full object-cover object-center"
                        src="https://via.placeholder.com/150"
                        alt="Partner 3"
                    />
                    <h2 className="text-xl font-bold text-gray-700 mt-4">Партнер 3</h2>
                    <p className="text-gray-500 mt-2">Описание партнера 3.</p>
                </Card>
            </div>
        </div>
    );
}

OurPartners.getLayout = function getLayout(page: ReactElement) {
    return (
        <HeadLayout title="Профиль" description="Профиль" keywords="Профиль">
            <PageLayout>{page}</PageLayout>
        </HeadLayout>
    )
}

export default OurPartners;