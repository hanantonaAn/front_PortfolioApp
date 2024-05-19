import { projectApi } from "./projectService";
import { IChat, IChatAndMessage } from "@/types/chat";


const chatService = projectApi.injectEndpoints({
    endpoints: (build) => ({
        getAllChat: build.query<IChat[], void>({
            query: () => ({
                url: `/chat/`,
            }),
            // providesTags: (result) =>
            //     result
            //         ? [
            //             ...result.map(({ id }) => ({ type: 'Chat' as const, id })),
            //             { type: 'Chat', id: 'LIST' },
            //         ]
            //         : [{ type: 'Chat', id: 'LIST' }],
        }),
        getChatById: build.query<IChatAndMessage, string>({
            query: (id) => ({
                url: `/chat/${id}/`
            }),
        }),
        createNewChat: build.mutation<any, any>({
            query: (data) => ({
                method: 'POST',
                url: `/chat/start/`,
                body: data,
            }),
            // invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAllChatQuery,
    useCreateNewChatMutation,
    useLazyGetChatByIdQuery
} = chatService;