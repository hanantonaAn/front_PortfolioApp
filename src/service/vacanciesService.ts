import { IVacancy } from "@/types/vacancy";
import { projectApi } from "./projectService";


const vacanciesService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        getNewVacancies: build.query<any, any>({
            query: (username) => ({
                url: `/fetch_vacancies/`,
                params: { username }
            }),
        }),
        getAllVacancies: build.query<IVacancy[], any>({
            query: (username) => ({
                url: `/vacancy/`,
                params: { username }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Vacancy' as const, id })),
                        { type: 'Vacancy', id: 'LIST' },
                    ]
                    : [{ type: 'Vacancy', id: 'LIST' }],
        }),
        updateVacancyById: build.mutation<IVacancy, { id: string, data: Partial<IVacancy> }>({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/vacancy-buff/${id}/`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Vacancy', id: 'LIST' }],
        }),
        deleteAllVacancy: build.mutation<unknown, any>({
            query: (id) => ({
                method: 'DELETE',
                url: `/vacancies/delete_all_by_username/${id}/`,
            }),
            invalidatesTags: [{ type: 'Vacancy', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useLazyGetNewVacanciesQuery,
    useGetAllVacanciesQuery,
    useUpdateVacancyByIdMutation,
    useDeleteAllVacancyMutation
} = vacanciesService;