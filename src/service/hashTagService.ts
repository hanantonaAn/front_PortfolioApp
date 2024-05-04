import { IHashTag } from "@/types/hashtag";
import { projectApi } from "./projectService";

const hashTagService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        getAllHashtag: build.query<IHashTag[], void>({
            query: () => ({
                url: `/hashtag/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Hashtag' as const, id })),
                        { type: 'Hashtag', id: 'LIST' },
                    ]
                    : [{ type: 'Hashtag', id: 'LIST' }],
        }),
        createHashTag: build.mutation<IHashTag, Partial<IHashTag>>({
            query: (data) => ({
                method: 'POST',
                url: '/hashtag/',
                body: data,
            }),
            invalidatesTags: [{ type: 'Hashtag', id: 'LIST' }],
        }),
        updateHashTagById: build.mutation<IHashTag, { id: string, data: Partial<IHashTag> }>({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/hashtag/${id}/`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Hashtag', id: 'LIST' }],
        }),
        deleteHashTag: build.mutation<unknown, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/hashtag/${id}`,
            }),
            invalidatesTags: [{ type: 'Hashtag', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreateHashTagMutation,
    useGetAllHashtagQuery,
    useUpdateHashTagByIdMutation,
    useDeleteHashTagMutation
} = hashTagService;