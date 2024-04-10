import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography, Input } from "@material-tailwind/react";
import HeadLayout from "@/components/layout/headLayout";
import Image from "next/image";
import Link from "next/link";
import { CiBasketball, CiSearch } from "react-icons/ci";
import { FaEye, FaLightbulb, FaRegFilePdf, FaSearch, FaShare, FaStar } from "react-icons/fa";
import { useGetUserInfoQuery } from "@/service/userInfoService";
import { useAppSelector } from "@/store/hooks";


const Home = () => {
  const { data: userInfo } = useGetUserInfoQuery();

  const user = useAppSelector(state => state.auth.user);

  return (
    <div className="mx-auto max-w-screen-xl py-12 px-5 lg:px-10">
      <Typography variant="h2" color="blue-gray" className="mb-2">
        Создайте своё резюме
      </Typography>
      <Typography variant="h2" color="blue-gray">
        И кастомизируйте...
      </Typography>
      <Link href={user ? "/resume" : "/registration"}>
        <Button className="mt-5" color="light-blue">Создать резюме</Button>
      </Link>
      <div className="mt-20">
        <Typography variant="h2">Платформа для поиска людей</Typography>
        <div className="w-[30rem] mt-4 flex items-center gap-6">
          <Input size="lg" label="Найти интересующее вас портфолио" icon={<CiSearch />} />
          <Button size="lg">Поиск</Button>
        </div>
      </div>
      <Typography variant="h3" className="mt-20">
        Популярные портфолио
      </Typography>
      <div className="grid grid-cols-3 gap-6 mt-12">
        {userInfo && userInfo.filter(x => x.user_data.length > 0).map((item, index) => {
          if (index < 3) {
            return (
              <Card key={item.user_data[0]?.id} className="w-full">
                <CardHeader color="blue-gray" className="relative h-56">
                  <Image
                    width={1024}
                    height={768}
                    className="w-full h-full"
                    src={item.user_data[0]?.picture ? item.user_data[0].picture.replace('/media/', 'http://127.0.0.1:8000/media/') : '/assets/images/bg_signals_new.png'}
                    alt="card-image"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item.user_data[0]?.fullname} {item.user_data[0]?.lastname}
                  </Typography>
                  <Typography>
                    Уровень образования: {item.user_data[0]?.education_level}
                  </Typography>
                  <Typography>
                    Город: {item.user_data[0]?.city}
                  </Typography>
                  <Typography>
                    Пол: {item.user_data[0]?.sex === 'male' ? 'Мужской' : 'Женский'}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 mt-auto">
                  <Link href={`/profile/${item.user.username}`}>
                    <Button>Открыть профиль</Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          }
        })}
      </div>
      <div className="container mx-auto px-4">
        <Typography variant="h4" className="text-center my-8">Почему мы?</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Typography variant="h5" className="mb-4">Наши особенности</Typography>
            <ul className="list-none">
              <li className="flex items-center mb-2">
                <CiBasketball size={24} />
                <Typography variant="paragraph" className="ml-2">Конструктор резюме</Typography>
              </li>
              <li className="flex items-center mb-2">
                <FaSearch size={24} />
                <Typography variant="paragraph" className="ml-2">Подбор вакансий</Typography>
              </li>
              <li className="flex items-center mb-2">
                <FaStar size={24} />
                <Typography variant="paragraph" className="ml-2">Рекомендательный блок</Typography>
              </li>
            </ul>
          </div>
          <div>
            <Typography variant="h5" className="mb-4">Ваше резюме</Typography>
            <ul className="list-none">
              <li className="flex items-center mb-2">
                <FaRegFilePdf size={24} />
                <Typography variant="paragraph" className="ml-2">Уникальность</Typography>
              </li>
              <li className="flex items-center mb-2">
                <CiBasketball size={24} />
                <Typography variant="paragraph" className="ml-2">Расскажите о себе</Typography>
              </li>
              <li className="flex items-center mb-2">
                <FaRegFilePdf size={24} />
                <Typography variant="paragraph" className="ml-2">Сохраняйте PDF вариант</Typography>
              </li>
            </ul>
          </div>
          <div>
            <Typography variant="h5" className="mb-4">Сообщество</Typography>
            <ul className="list-none">
              <li className="flex items-center mb-2">
                <FaEye size={24} />
                <Typography variant="paragraph" className="ml-2">Смотрите резюме коллег</Typography>
              </li>
              <li className="flex items-center mb-2">
                <FaShare size={24} />
                <Typography variant="paragraph" className="ml-2">Делитесь</Typography>
              </li>
              <li className="flex items-center mb-2">
                <FaLightbulb size={24} />
                <Typography variant="paragraph" className="ml-2">Вдохновляйтесь резюме других пользователей</Typography>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Главная" description="Главная" keywords="Главная">
      <PageLayout>{page}</PageLayout>
    </HeadLayout>
  )
}

export default Home;