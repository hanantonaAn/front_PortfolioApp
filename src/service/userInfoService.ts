import { projectApi } from "./projectService";
import { UserInfo, UserInfoSolo } from "@/types/userInfo";

const userInfoService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        // NO AUTH METHOD
        getUserInfo: build.query<UserInfo[], void>({
            query: () => ({
                url: `/public_usersinfo/`,
            }),
        }),
        getUserInfoByUsername: build.query<UserInfoSolo, string>({
            query: (id) => ({
                url: `/userinfo_username/${id}/`,
            }),
            providesTags: (result) => [{ type: 'UserInfo', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserInfoQuery,
    useGetUserInfoByUsernameQuery
} = userInfoService;