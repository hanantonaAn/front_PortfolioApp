import { FormConstructor } from "@/components/formConstructor";
import HeadLayout from "@/components/layout/headLayout";
import PageLayout from "@/components/layout/pageLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { AdvancedSearchCardScreen } from "@/components/screens/advancedSearchCardScreen";
import { advancedSearchForm } from "@/forms/advancedSearchForm";
import { useGetUserInfoQuery } from "@/service/userInfoService";
import { AdvancedSearchSchema, IAdvancedSearchType } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";



const AdvancedSearch = () => {

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<IAdvancedSearchType>({
        resolver: yupResolver(AdvancedSearchSchema),
    });

    const router = useRouter();

    const { data: userInfo, isLoading } = useGetUserInfoQuery();
    const [filteredUsers, setFilteredUsers] = useState<any>([]);

    useEffect(() => {
        if (userInfo) {
            setFilteredUsers(userInfo)
        }
    }, [userInfo])

    const submitForm: SubmitHandler<IAdvancedSearchType> = (data) => {

        const filtered = userInfo && userInfo.filter(user => {
            const userData = user.user_data[0];
            const userExperience = user.user_experience[0];
            const userSkills = user.user_skills[0];
            console.log(userExperience)
            console.log(data.experience)

            const usernameMatch = !data.username || user?.user?.username.includes(data.username);
            const languagesMatch = !data.languages || userData?.languages.includes(data.languages);
            const skillsMatch = !data.skills || userSkills?.skills.some(skill => data.skills?.includes(skill));
            const experienceMatch = !data.experience || userExperience?.experience.includes(data.experience);
            const experienceYearsMatch = !data.experience_years || userExperience?.experience_years === data?.experience_years;
            return usernameMatch && languagesMatch && skillsMatch && experienceMatch && experienceYearsMatch;
        });

        setFilteredUsers(filtered);
    };

    useEffect(() => {
        if (router.query) {
            if (router.query.search) {
                reset({
                    username: router.query.search.toString()
                })

                const filtered = userInfo && userInfo.filter(user => {
                    const usernameMatch = !router.query.search || user?.user?.username.includes(router.query.search.toString());
                    return usernameMatch;
                });
                setFilteredUsers(filtered);

            }
        }
    }, [router, userInfo])

    const clearSearch = () => {
        reset({
            username: '',
            languages: '',
            skills: '',
            education_level: '',
            experience: '',
            experience_years: '',
        });
        router.push({
            pathname: router.pathname,
            query: {},
        }, undefined, { shallow: true });

        setFilteredUsers(userInfo);
    };

    return (
        <section className="pt-12">
            <Wrapper>
                <Typography variant="h3" color="blue-gray" className="text-center font-bold">
                    Поиск портфолио
                </Typography>
                <div className="flex flex-col items-start lg:w-3/12 justify-start mt-8">
                    <Link href="/">
                        <Button color="blue">Вернуться назад</Button>
                    </Link>
                </div>
                <div className="flex justify-center">
                    <FormConstructor fieldList={advancedSearchForm}
                        onSubmit={handleSubmit(data => submitForm(data))}
                        register={register}
                        inputClassName="grid grid-cols-1 lg:grid-cols-3 gap-2"
                        containerClassName="mt-6"
                        control={control}
                        errors={errors}>
                        <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between">
                            <Button onClick={clearSearch} color="deep-orange" size="md" className="flex mt-4 text-lg items-center gap-3">
                                Очистить
                                <MdClear size={20} />
                            </Button>
                            <Button type="submit" color="light-blue" size="md" className="flex mt-4 text-lg items-center gap-3">
                                Поиск
                                <FaSearch size={20} />
                            </Button>
                        </div>
                    </FormConstructor>
                </div>
                <div className="mt-4">
                    <AdvancedSearchCardScreen userInfo={filteredUsers} isLoading={isLoading} />
                </div>
            </Wrapper>
        </section>
    )
}

export default AdvancedSearch;

AdvancedSearch.getLayout = function getLayout(page: ReactElement) {
    return (
        <HeadLayout title="Поиск портфолио" description="Поиск портфолио" keywords="Поиск портфолио">
            <PageLayout>{page}</PageLayout>
        </HeadLayout>
    )
}