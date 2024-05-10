import { IPortfolioUsername } from "@/types/portfolio";
import { projectApi } from "./projectService";

const portfolioUsernameService = projectApi.injectEndpoints({
  endpoints: (build) => ({
    // get by userbyusername
    getPortfolioUsername: build.query<IPortfolioUsername, string>({
      query: (id) => ({
        url: `/portfolio_username/${id}/`,
      }),
      providesTags: (result) => [{ type: 'PortfolioUsername', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const {
    useGetPortfolioUsernameQuery
} = portfolioUsernameService;