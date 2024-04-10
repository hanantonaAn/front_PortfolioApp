import { projectApi } from "./projectService";
import { IExperience } from "@/types/experience";

const userExperienceByUserService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        getUserExperienceByUser: build.query<IExperience[], void>({
            query: () => ({
                url: `/userexperiencebyuser/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'UserExperience' as const, id })),
                        { type: 'UserExperience', id: 'LIST' },
                    ]
                    : [{ type: 'UserExperience', id: 'LIST' }],
        }),
        // create experience
        createUserExperienceByUser: build.mutation<IExperience, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userexperiencebyuser/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserExperience', id: 'LIST' }],
        }),
        // update experience
        updateUserExperienceByUser: build.mutation<IExperience, {id: string, data: FormData}>({
            query: ({id, data}) => ({
                method: "PATCH",
                url: `/userexperiencebyuser/${id}/`,
                body: data
            }),
            invalidatesTags: [{ type: 'UserExperience', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserExperienceByUserQuery,
    useCreateUserExperienceByUserMutation,
    useUpdateUserExperienceByUserMutation
} = userExperienceByUserService;