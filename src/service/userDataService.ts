import { UserDataByUser } from "@/types/userDataByUser";
import { projectApi } from "./projectService";

const userDataService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        // NO AUTH METHOD
        getUserData: build.query<UserDataByUser[], void>({
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
    }),
    overrideExisting: false,
})

export const {
    useGetUserDataQuery,
} = userDataService;