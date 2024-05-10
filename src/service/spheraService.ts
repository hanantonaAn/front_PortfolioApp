import { ISphere } from "@/types/sphere";
import { projectApi } from "./projectService";

const spheraService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        // get all sphera
        getAllSphera: build.query<ISphere[], void>({
            query: () => ({
                url: `/sphere/`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllSpheraQuery
} = spheraService;