import { IProfileType } from "@/utils/yupSchema";
import { projectApi } from "./projectService";

const userDataService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        getUserData: build.query<IProfileType, string>({
            query: () => ({
                url: `/userdata/`,
            }),
            // providesTags: (result) =>
            //     result
            //         ? [
            //             ...result.map(({ _id }) => ({ type: 'Experiences' as const, _id })),
            //             { type: 'Experiences', id: 'LIST' },
            //         ]
            //         : [{ type: 'Experiences', id: 'LIST' }],
        }),
        createUserData: build.mutation<IProfileType, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userdata/`,
                body: data
            }),
            // invalidatesTags: [{ type: 'Experiences', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserDataQuery,
    useCreateUserDataMutation
} = userDataService;