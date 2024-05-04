import { IPortfolio } from "@/types/portfolio";
import { projectApi } from "./projectService";

const portfolioService = projectApi.injectEndpoints({
  endpoints: (build) => ({
    // get by userbyusername
    getAllPortfolio: build.query<IPortfolio[], void>({
      query: () => ({
        url: `/portfolio/`,
      }),
    }),
    createPortfolio: build.mutation<IPortfolio, Partial<IPortfolio>>({
      query: (data) => ({
        method: 'POST',
        url: '/portfolio/',
        body: data,
      }),
      invalidatesTags: [{ type: 'UserInfo', id: 'LIST' }],
    }),
    updatePortfolioById: build.mutation<IPortfolio, { id: string, data: Partial<IPortfolio> }>({
      query: ({ id, data }) => ({
        method: 'PATCH',
        url: `/portfolio/${id}/`,
        body: data,
      }),
      invalidatesTags: [{ type: 'UserInfo', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllPortfolioQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioByIdMutation
} = portfolioService;