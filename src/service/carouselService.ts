import { projectApi } from "./projectService";
import { ISlider } from "@/types/slider";

const carouselService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCarousel: build.query<ISlider[], void>({
            query: () => ({
                url: `/slider/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Slider' as const, id })),
                        { type: 'Slider', id: 'LIST' },
                    ]
                    : [{ type: 'Slider', id: 'LIST' }],
        }),
        getSliderById: build.query<ISlider, string>({
            query: (id) => ({
                url: `/slider/${id}/`,
            }),
            providesTags: (result) => [{ type: 'Slider', id: 'LIST' }],
        }),
        createCarousel: build.mutation<ISlider, FormData>({
            query: (data) => ({
                method: 'POST',
                url: '/slider/',
                body: data,
            }),
            invalidatesTags: [{ type: 'Slider', id: 'LIST' }],
        }),
        updateCarouselById: build.mutation<ISlider, { id: string, data: Partial<ISlider> }>({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/slider/${id}/`,
                body: data,
            }),
            invalidatesTags: [{ type: 'Slider', id: 'LIST' }],
        }),
        deleteCarousel: build.mutation<unknown, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/slider/${id}`,
            }),
            invalidatesTags: [{ type: 'Slider', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllCarouselQuery,
    useUpdateCarouselByIdMutation,
    useCreateCarouselMutation,
    useDeleteCarouselMutation,
    useGetSliderByIdQuery
} = carouselService;