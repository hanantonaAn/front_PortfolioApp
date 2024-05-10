import { projectApi } from "./projectService";
import { ISlider, ISliderImage } from "@/types/slider";

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
            invalidatesTags: [{ type: 'Slider', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST' }],
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
                url: `/slider/${id}/`,
            }),
            invalidatesTags: [{ type: 'Slider', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST' }],
        }),
        getImagesBySlider: build.query<ISliderImage[], string | undefined>({
            query: (slider_id) => ({
                url: `/images_by_slider/`,
                params: { slider_id }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'ImageSlider' as const, id })),
                        { type: 'ImageSlider', id: 'LIST' },
                    ]
                    : [{ type: 'ImageSlider', id: 'LIST' }],
        }),
        createImageBySlider: build.mutation<ISliderImage, FormData>({
            query: (data) => ({
                method: 'POST',
                url: `/slider-images/`,
                body: data
            }),
            invalidatesTags: [{ type: 'ImageSlider', id: 'LIST' }, { type: 'Slider', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST'}],
        }),
        deleteImageBySlider: build.mutation<ISliderImage, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/slider-images/${id}/`,
            }),
            invalidatesTags: [{ type: 'ImageSlider', id: 'LIST' }, { type: 'Slider', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST'}],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllCarouselQuery,
    useUpdateCarouselByIdMutation,
    useCreateCarouselMutation,
    useDeleteCarouselMutation,
    useGetSliderByIdQuery,
    useGetImagesBySliderQuery,
    useCreateImageBySliderMutation,
    useDeleteImageBySliderMutation
} = carouselService;