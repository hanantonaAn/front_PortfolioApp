import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useState } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import HeadLayout from "@/components/layout/headLayout";
import Link from "next/link";
import { CiBasketball, CiSearch } from "react-icons/ci";
import { FaEye, FaLightbulb, FaRegFilePdf, FaSearch, FaShare, FaStar } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import { useGetUserInfoQuery } from "@/service/userInfoService";
import { useRouter } from "next/router";
import { AuthWrapper } from "@/components/layout/authWrapper";
import Image from "next/image";
import { HomeCardScreen } from "@/components/screens/homeScreen/homeCardScreen";


const Home = () => {

  const user = useAppSelector(state => state.auth.user);

  const { data: userInfo, isLoading } = useGetUserInfoQuery();

  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  return (
    <AuthWrapper>
      <PageLayout>
        <div className="mx-auto relative max-w-screen-xl py-12 px-5 lg:px-10">
          <Image className="absolute -right-24 top-0 hidden lg:block" src="/assets/vector/bg_vector.svg" alt="" width={520} height={244} />
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Создайте своё резюме
          </Typography>
          <Typography variant="h2" color="blue-gray">
            И кастомизируйте...
          </Typography>
          <Link href={user ? "/portfolio" : "/registration"}>
            <Button className="mt-5" color="light-blue">Создать портфолио</Button>
          </Link>
          <div className="mt-20">
            <Typography variant="h2">Платформа для поиска людей</Typography>
            <div className="lg:w-[30rem] mt-4 flex lg:flex-row flex-col items-center gap-6">
              <Input
                size="lg" label="Найти интересующее вас портфолио"
                icon={<CiSearch />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button onClick={() => router.push(`/advanced-search?search=${encodeURIComponent(searchValue)}`)} size="lg">Поиск</Button>
            </div>
          </div>
          <div className="mt-20">
            <Typography variant="h2">Найдите интересующее Вас портфолио</Typography>
            <Link href="/advanced-search">
              <Button color="light-blue" className="mt-5" size="lg">Найти</Button>
            </Link>
          </div>
          {userInfo && userInfo.filter(x => x.user.username === "hello_1" || x.user.username === "hello_2" || x.user.username === "hello_3").length > 0 ?
            <Typography variant="h3" className="mt-20">
              Популярные портфолио
            </Typography>
            : null
          }

          <HomeCardScreen userInfo={userInfo} isLoading={isLoading} />

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
      </PageLayout>
    </AuthWrapper>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Главная" description="Главная" keywords="Главная">
      {page}
    </HeadLayout>
  )
}

export default Home;