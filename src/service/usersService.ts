import { IUsers } from "@/types/user";
import { projectApi } from "./projectService";

const usersService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get by userbyusername
        getUserByUsername: build.query<IUsers, string>({
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
    useGetUserByUsernameQuery
} = usersService;