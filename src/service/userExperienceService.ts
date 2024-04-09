import { projectApi } from "./projectService";
import { IExperience } from "@/types/experience";

const userExperienceByUserService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all experience
        getUserExperience: build.query<IExperience[], void>({
            query: () => ({
                url: `/userexperience/`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserExperienceQuery,
} = userExperienceByUserService;