import { IPhoto } from "@/types/photo";
import { projectApi } from "./projectService";


const photoService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPhoto: build.query<IPhoto[], void>({
            query: () => ({
                url: `/photo/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Photo' as const, id })),
                        { type: 'Photo', id: 'LIST' },
                    ]
                    : [{ type: 'Photo', id: 'LIST' }],
        }),
        getPhotoById: build.query<IPhoto, string>({
            query: (id) => ({
                url: `/photo/${id}/`,
            }),
            providesTags: (result) => [{ type: 'Photo', id: 'LIST' }],
        }),
        createPhoto: build.mutation<IPhoto, FormData>({
            query: (data) => ({
                method: 'POST',
                url: '/photo/',
                body: data,
            }),
            invalidatesTags: [{ type: 'Photo', id: 'LIST' }],
        }),
        updatePhotoById: build.mutation<IPhoto, { id: string, data: Partial<IPhoto> }>({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/photo/${id}/`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Photo', id: 'LIST' }],
        }),
        deletePhoto: build.mutation<unknown, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/photo/${id}`,
            }),
            invalidatesTags: [{ type: 'Photo', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllPhotoQuery,
    useCreatePhotoMutation,
    useUpdatePhotoByIdMutation,
    useGetPhotoByIdQuery,
    useDeletePhotoMutation
} = photoService;