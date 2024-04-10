import { ISkills } from "@/types/skills";
import { projectApi } from "./projectService";

const usersSkillByUserService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        getUserSkillsByUser: build.query<ISkills[], void>({
            query: () => ({
                url: `/userskillsbyuser/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'UserSkills' as const, id })),
                        { type: 'UserSkills', id: 'LIST' },
                    ]
                    : [{ type: 'UserSkills', id: 'LIST' }],
        }),
        // create experience
        createUserSkillsByUser: build.mutation<ISkills, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userskillsbyuser/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserSkills', id: 'LIST' }],
        }),
        // update experience
        updateUsersSkillsByUser: build.mutation<ISkills, {id: string, data: FormData}>({
            query: ({id, data}) => ({
                method: "PATCH",
                url: `/userskillsbyuser/${id}/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserSkills', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserSkillsByUserQuery,
    useCreateUserSkillsByUserMutation,
    useUpdateUsersSkillsByUserMutation
} = usersSkillByUserService;