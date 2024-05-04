import { AuthWrapper } from "@/components/layout/authWrapper";
import HeadLayout from "@/components/layout/headLayout";
import PageLayout from "@/components/layout/pageLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { VacancyCard } from "@/components/ui/vacancyCard";
import { useDeleteAllVacancyMutation, useGetAllVacanciesQuery, useLazyGetNewVacanciesQuery, useUpdateVacancyByIdMutation } from "@/service/vacanciesService";
import { useAppSelector } from "@/store/hooks";
import { Button, Dialog, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";



const VacanciesPage = () => {

    const user = useAppSelector(state => state.auth.me);

    const [fetchVacancies] = useLazyGetNewVacanciesQuery();

    const { data: allVacancy, refetch } = useGetAllVacanciesQuery(user?.username, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });

    const getNewVacancies = () => {
        toast.promise(
            fetchVacancies(user?.username).unwrap(),
            {
                loading: 'Загрузка новых вакансий...',
                success: () => `Список новых вакансий загружен`,
                error: () => `Произошла ошибка`
            }
        ).then(() => refetch())
    };

    const [updateVacancy] = useUpdateVacancyByIdMutation();

    const LikeVacancy = (id: string, status: string) => {
        toast.promise(
            updateVacancy({
                id: id, data: {
                    status: status
                }
            }).unwrap(),
            {
                loading: 'Сохранение...',
                success: () => `Вакансия добавлена в избранное`,
                error: () => `Произошла ошибка`
            }
        )
    };

    const [activePage, setActivePage] = useState<boolean>(true);

    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const [deleteAllVacansy] = useDeleteAllVacancyMutation();

    const deleteVacancys = () => {
        toast.promise(
            deleteAllVacansy(user?.username).unwrap(),
            {
                loading: 'Удаление...',
                success: () => `Вакансии успешно удалены`,
                error: () => `Произошла ошибка`
            }
        ).then(() => handleOpenDelete())
    };


    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title="Вакансии" description="Вакансии" keywords="Вакансии">
                    <Dialog open={openDelete} handler={handleOpenDelete}>
                        <DialogHeader>Вы уверены, что хотите удалить все вакансии?</DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="blue"
                                onClick={handleOpenDelete}
                                className="mr-1"
                            >
                                <span>Отменить</span>
                            </Button>
                            <Button variant="gradient" color="red" onClick={deleteVacancys}>
                                <span>Подтвердить</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    <section className="py-8">
                        <Wrapper>
                            <Link href="/">
                                <Button color="blue">Вернуться на главную</Button>
                            </Link>
                            <Typography variant="h3" color="blue-gray" className="text-center lg:mt-0 mt-6 mb-4 font-bold">
                                Вакансии
                            </Typography>
                            <div className="flex justify-center">
                                <Button onClick={getNewVacancies} color="green">Получить список вакансий</Button>
                            </div>
                            <div className="flex lg:flex-row flex-col lg:items-start lg:gap-8 mt-6">
                                <div className="flex flex-col gap-2">
                                    <Button onClick={() => setActivePage(true)} color={activePage ? "blue-gray" : "blue"}>Все вакансии</Button>
                                    <Button onClick={() => setActivePage(false)} color={!activePage ? "blue-gray" : "blue"}>Избранные</Button>
                                    <Button onClick={handleOpenDelete} color="red">Удалить вакансии</Button>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 flex-1 lg:pr-20">
                                    {allVacancy && allVacancy.map(item => {
                                        if (item.status !== 'favorites' && activePage) {
                                            return (
                                                <VacancyCard likeVacancy={() => LikeVacancy(item.id, "favorites")} key={item.id} vacancy={item} />
                                            )
                                        } else if (item.status === 'favorites' && !activePage) {
                                            return (
                                                <VacancyCard likeVacancy={() => LikeVacancy(item.id, "all")} key={item.id} vacancy={item} />
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </Wrapper>
                    </section>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    )
}

export default VacanciesPage;