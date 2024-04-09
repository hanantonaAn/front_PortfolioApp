import { projectApi } from "./projectService";
import { UserInfo, UserInfoSolo } from "@/types/userInfo";

const userInfoService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        // NO AUTH METHOD
        getUserInfo: build.query<UserInfo[], void>({
            query: () => ({
                url: `/usersinfo/`,
            }),
            // providesTags: (result) =>
            //     result
            //         ? [
            //             ...result.map(({ _id }) => ({ type: 'Experiences' as const, _id })),
            //             { type: 'Experiences', id: 'LIST' },
            //         ]
            //         : [{ type: 'Experiences', id: 'LIST' }],
        }),
        getUserInfoByUsername: build.query<UserInfoSolo, string>({
            query: (id) => ({
                url: `/userinfo_username/${id}/`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserInfoQuery,
    useGetUserInfoByUsernameQuery
} = userInfoService;