import { projectApi } from "./projectService";
import { UserDataByUser } from "@/types/userDataByUser";

export const userDataByUserService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        // AUTH METHOD
        getUserDataByUser: build.query<UserDataByUser[], void>({
            query: () => ({
                url: `/userdatabyuser/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'UserProfile' as const, id })),
                        { type: 'UserProfile', id: 'LIST' },
                    ]
                    : [{ type: 'UserProfile', id: 'LIST' }],
        }),
        createUserDataByUser: build.mutation<UserDataByUser, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userdatabyuser/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserProfile', id: 'LIST' }],
        }),
        updateUserDataByUser: build.mutation<UserDataByUser, { id: string, data: FormData | Partial<UserDataByUser> }>({
            query: ({ id, data }) => ({
                method: "PATCH",
                url: `/userdatabyuser/${id}/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserProfile', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserDataByUserQuery,
    useCreateUserDataByUserMutation,
    useUpdateUserDataByUserMutation,
    useLazyGetUserDataByUserQuery
} = userDataByUserService;