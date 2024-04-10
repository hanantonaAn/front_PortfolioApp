import { IProfileType } from "@/utils/yupSchema";
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
        createUserDataByUser: build.mutation<IProfileType, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userdatabyuser/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserProfile', id: 'LIST' }],
        }),
        updateUserDataByUser: build.mutation<IProfileType, { id: string, data: FormData }>({
            query: ({ id, data }) => ({
                method: "PATCH",
                url: `/userdatabyuser/${id}/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserProfile', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserDataByUserQuery,
    useCreateUserDataByUserMutation,
    useUpdateUserDataByUserMutation
} = userDataByUserService;