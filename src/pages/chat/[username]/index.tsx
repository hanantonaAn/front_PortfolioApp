import { AuthWrapper } from "@/components/layout/authWrapper";
import HeadLayout from "@/components/layout/headLayout";
import PageLayout from "@/components/layout/pageLayout";
import { Wrapper } from "@/components/layout/wrapper";
import { useLazyGetChatByIdQuery } from "@/service/chatService";
import { useGetUserInfoByUsernameQuery } from "@/service/userInfoService";
import { useAppSelector } from "@/store/hooks";
import { IMessage } from "@/types/chat";
import { Avatar } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Chat = () => {

    const username = useAppSelector(state => state.auth.me?.username);
    const userId = useAppSelector(state => state.auth.me?.id);

    const router = useRouter();

    const [postId, setPostId] = useState<{ username: string, id: string } | null>(null);

    useEffect(() => {
        if (router.isReady) {
            // Проверяем, что router.query.id не undefined, прежде чем передавать его в setPostId
            if (router.query.username && router.query.id) {
                setPostId({ username: router.query.username as string, id: router.query.id as string });
            }
        }
    }, [router.isReady, router.query.id, router.query.username]);

    const { data: userByName } = useGetUserInfoByUsernameQuery(postId?.username || '');

    const socketRef = useRef<any>()

    const [chatById] = useLazyGetChatByIdQuery();

    const [message, setMessage] = useState<string>('');
    const [allMessage, setAllMessage] = useState<IMessage[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (postId) {
            socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${postId.id}/?token=${token}`);
            socketRef.current.addEventListener('message', (event: any) => {
                const data = JSON.parse(event.data);
                setAllMessage(prev => [...prev, data])
            });
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                setAllMessage([])
            }
        };
    }, [postId])


    useEffect(() => {
        if (postId) {
            chatById(postId.id.toString()).unwrap()
                .then(res => {
                    setAllMessage(prev => [...prev, ...res.message_set])
                })
        }
    }, [postId])


    const sendMessage = () => {
        if (message) {
            const messageToSend = {
                message: message,
            };

            try {
                socketRef.current?.send(JSON.stringify(messageToSend));
            } catch (error) {
                console.error("Ошибка отправки сообщения:", error);
            }

            setMessage('');
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            sendMessage()
        }
    }


    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        })
    }

    useEffect(() => {
        scrollToBottom()
    }, [allMessage])

    return (
        <AuthWrapper>
            <PageLayout>
                <HeadLayout title={'Чат'} description="Чат" keywords="Чат">
                    <Wrapper>
                        <div className="flex-1 p:2 sm:p-6 justify-between max-h-1/2 flex flex-col h-full">
                            <div className="flex sm:items-center py-3 border-b-2 border-gray-200">
                                <div className="relative flex items-center space-x-4">
                                    <Avatar size="xl" src={userByName?.user_data.picture ? userByName.user_data.picture.replace('/', 'http://127.0.0.1:8000/') : '/assets/images/avatar_default.png'} alt="" />
                                    <div className="flex flex-col leading-tight">
                                        <div className="text-2xl mt-1 flex items-center">
                                            <span className="text-gray-700 mr-3">{userByName?.user_data?.fullname} {userByName?.user_data?.surname}</span>
                                        </div>
                                        <span className="text-lg text-gray-600">{userByName?.user_data?.position}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-h-96 flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                                {allMessage && allMessage.map(item => {
                                    return (
                                        <div key={item.id} className={`flex items-end ${item.sender === userId ? 'justify-end' : ''}`}>
                                            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${item.sender === userId ? 'items-end order-1' : 'items-start order-2'}`}>
                                                <div><span className={`px-4 py-2 rounded-lg inline-block rounded-bl-none ${item.sender === userId ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>{item.text}</span></div>
                                            </div>
                                            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className={`"w-6 h-6 rounded-full ${item.sender === userId ? 'order-2' : 'order-1'} `} />
                                        </div>
                                    )
                                })}
                                <div className="pb-10" ref={messagesEndRef} />
                            </div>
                            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                                <div className="relative flex">
                                    <input onKeyDown={onKeyDown} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 px-3 bg-gray-200 rounded-md py-3" />
                                    <button onClick={sendMessage} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                        <span className="font-bold">Send</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                </HeadLayout>
            </PageLayout>
        </AuthWrapper>
    );
}

export default Chat;