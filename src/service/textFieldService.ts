import { ITextField } from "@/types/textfield";
import { projectApi } from "./projectService";

const textFieldService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTextFields: build.query<ITextField[], void>({
            query: () => ({
                url: `/textfield/`,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'TextField' as const, id })),
                        { type: 'TextField', id: 'LIST' },
                    ]
                    : [{ type: 'TextField', id: 'LIST' }],
        }),
        createTextField: build.mutation<ITextField, Partial<ITextField>>({
            query: (data) => ({
                method: 'POST',
                url: '/textfield/',
                body: data,
            }),
            invalidatesTags: [{ type: 'TextField', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST' }],
        }),
        updateTextFieldById: build.mutation<ITextField, { id: string, data: Partial<ITextField> }>({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/textfield/${id}/`,
                body: data,
            }),
            invalidatesTags: [{ type: 'TextField', id: 'LIST' }],
        }),
        deleteTextField: build.mutation<unknown, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `/textfield/${id}`,
            }),
            invalidatesTags: [{ type: 'TextField', id: 'LIST' }, { type: 'PortfolioUsername', id: 'LIST' }],
        }),
        getTextFieldById: build.query<ITextField, string>({
            query: (id) => ({
                url: `/textfield/${id}/`,
            }),
            providesTags: (result) => [{ type: 'TextField', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllTextFieldsQuery,
    useCreateTextFieldMutation,
    useUpdateTextFieldByIdMutation,
    useDeleteTextFieldMutation,
    useGetTextFieldByIdQuery
} = textFieldService;