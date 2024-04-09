import { IProfileType } from "@/utils/yupSchema";
import { projectApi } from "./projectService";
import { UserDataByUser } from "@/types/userDataByUser";

const userDataByUserService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        // AUTH METHOD
        getUserDataByUser: build.query<UserDataByUser[], void>({
            query: () => ({
                url: `/userdatabyuser/`,
            }),
            // providesTags: (result) =>
            //     result
            //         ? [
            //             ...result.map(({ _id }) => ({ type: 'Experiences' as const, _id })),
            //             { type: 'Experiences', id: 'LIST' },
            //         ]
            //         : [{ type: 'Experiences', id: 'LIST' }],
        }),
        createUserDataByUser: build.mutation<IProfileType, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userdatabyuser/`,
                body: data
            }),
            // invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
        }),
        updateUserDataByUser: build.mutation<IProfileType, {id: string, data: FormData}>({
            query: ({id, data}) => ({
                method: "PATCH",
                url: `/userdatabyuser/${id}/`,
                body: data
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserDataByUserQuery,
    useCreateUserDataByUserMutation,
    useUpdateUserDataByUserMutation
} = userDataByUserService;