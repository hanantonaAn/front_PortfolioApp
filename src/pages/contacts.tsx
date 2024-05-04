import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Card, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";

const Contacts = () => {
  return (
    <AuthWrapper>
      <PageLayout>
        <div className="bg-lightBlue-500 lg:mt-20 mt-6 flex items-center justify-center">
          <Card className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
            <h1 className="text-4xl font-bold text-gray-700 mb-6">Свяжитесь с нами</h1>
            <p className="text-gray-500 mb-8">Мы всегда рады помочь вам. Напишите нам, и мы ответим на ваши вопросы.</p>
            <div className="mb-4">
              <Typography variant="h5" className="text-gray-700 font-semibold">Наш адрес</Typography>
              <Typography variant="lead" className="text-gray-500">г. Йошкар-Ола, ул. Волкова 196а</Typography>
            </div>
            <div className="mb-4">
              <Typography variant="h5" className="text-gray-700 font-semibold">Наш телефон</Typography>
              <Typography variant="lead" className="text-gray-500">+7 951 897 60 03</Typography>
            </div>
            <div className="mb-4">
              <Typography variant="h5" className="text-gray-700 font-semibold">Наш email</Typography>
              <Typography variant="lead" className="text-gray-500">999antonova999@mail.ru</Typography>
            </div>
          </Card>
        </div>
      </PageLayout>
    </AuthWrapper>
  );
}

Contacts.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Профиль" description="Профиль" keywords="Профиль">
      {page}
    </HeadLayout>
  )
}

export default Contacts;