import { projectApi } from "./projectService";
import { IExperience } from "@/types/experience";

const userExperienceByUserService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        getUserExperienceByUser: build.query<IExperience[], void>({
            query: () => ({
                url: `/userexperiencebyuser/`,
            }),
        }),
        // create experience
        createUserExperienceByUser: build.mutation<IExperience, FormData>({
            query: (data) => ({
                method: "POST",
                url: `/userexperiencebyuser/`,
                body: data
            }),
        }),
        // update experience
        updateUserExperienceByUser: build.mutation<IExperience, {id: string, data: FormData}>({
            query: ({id, data}) => ({
                method: "PATCH",
                url: `/userexperiencebyuser/${id}/`,
                body: data
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserExperienceByUserQuery,
    useCreateUserExperienceByUserMutation,
    useUpdateUserExperienceByUserMutation
} = userExperienceByUserService;