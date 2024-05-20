import { useGetAllChatQuery, useLazyGetChatByIdQuery } from "@/service/chatService";
import { useAppSelector } from "@/store/hooks";
import { IChat, IMessage } from "@/types/chat";
import { Avatar, Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

export const Chat = () => {
    const username = useAppSelector(state => state.auth.me?.username);
    const userId = useAppSelector(state => state.auth.me?.id);

    const { data: getAllChat } = useGetAllChatQuery();

    const socketRef = useRef<any>()
    const router = useRouter();

    const [chatById] = useLazyGetChatByIdQuery();

    const [openChat, setOpenChat] = useState<boolean>(false);
    const [changeUser, setChangeUser] = useState<IChat | null>();
    const [message, setMessage] = useState<string>('');
    const [allMessage, setAllMessage] = useState<IMessage[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (changeUser) {
            socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${changeUser.id}/?token=${token}`);
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
    }, [changeUser])


    useEffect(() => {
        if (changeUser) {
            chatById(changeUser.id.toString()).unwrap()
                .then(res => {
                    setAllMessage(prev => [...prev, ...res.message_set])
                })
        }
    }, [changeUser])


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
        <>
            <div className="fixed bottom-56 z-50 right-12">
                <Button color="blue" onClick={() => setOpenChat(prev => !prev)}>
                    Чат
                </Button>
            </div>
            <section className={`${openChat ? 'block' : 'hidden'} fixed z-50 bottom-56 right-36 w-96`}>
                <div className="border-borderPrim rounded-2xl flex flex-col justify-between min-h-[500px] max-h-[510px] bg-gray-300 border-solid border-[2px]">
                    {changeUser ?
                        <>
                            <div className="flex items-center relative justify-center py-4 px-2 rounded-t-2xl bg-white">
                                <IoMdArrowRoundBack onClick={() => { setChangeUser(null); socketRef.current.close(); }} className="cursor-pointer absolute left-2 hover:bg-black hover:text-white rounded-full w-5 h-5 p-1" />
                                {changeUser.initiator.username !== username ?

                                    <div onClick={() => router.push(`/profile/${changeUser.initiator.username}`)} className="flex items-center gap-2.5 cursor-pointer">
                                        <Avatar size="sm" variant="circular" src={changeUser.initiator_chat.picture ? changeUser.initiator_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                        <div>{changeUser.initiator_chat.fullname} {changeUser.initiator_chat.surname}</div>
                                    </div>
                                    :
                                    changeUser.receiver.username !== username ?
                                        <div onClick={() => router.push(`/profile/${changeUser.receiver.username}`)} className="flex items-center gap-2.5 cursor-pointer">
                                            <Avatar size="sm" variant="circular" src={changeUser.receiver_chat.picture ? changeUser.receiver_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                            <div>{changeUser.receiver_chat.fullname} {changeUser.receiver_chat.surname}</div>
                                        </div>
                                        :
                                        <div>Неизвестный пользователь</div>
                                }
                            </div>
                            <div className="overflow-y-hidden flex flex-col min-h-full h-full justify-end">
                                <div className="px-4 overflow-y-auto aside-scrollbars-light">
                                    {allMessage && allMessage.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1).map(item => {
                                        return (
                                            <div key={item.id} className={`flex items-end mt-6 gap-1 ${item.sender === userId ? 'flex-row-reverse' : 'flex-row'}`}>
                                                {item.sender === userId && changeUser.initiator.username === username ?
                                                    <Avatar size="sm" variant="circular" src={changeUser.initiator_chat.picture ? changeUser.initiator_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                                    :
                                                    item.sender !== userId && changeUser.receiver.username !== username ?
                                                        <Avatar size="sm" variant="circular" src={changeUser.receiver_chat.picture ? changeUser.receiver_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                                        :
                                                        item.sender !== userId && changeUser.receiver.username === username ?
                                                        <Avatar size="sm" variant="circular" src={changeUser.receiver_chat.picture ? changeUser.receiver_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                                        :
                                                        <Avatar size="sm" variant="circular" src={changeUser.initiator_chat.picture ? changeUser.initiator_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                                }
                                                <span>{item.text}</span>
                                            </div>
                                        )
                                    })}
                                    <div className="pb-10" ref={messagesEndRef} />
                                </div>
                            </div>
                            <div className="border-t-borderPrim pr-4 border-t-2">
                                <div className="relative w-full pr-10">
                                    <input onKeyDown={onKeyDown} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full h-12 px-5 text-black rounded-b-2xl bg-input border-none outline-none" />
                                    <IoSend onClick={sendMessage} className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </>
                        :
                        <div className="overflow-y-hidden flex flex-col min-h-full h-full justify-end">
                            {getAllChat && getAllChat.map(item => {
                                const otherUser = username === item.initiator.username ? item.receiver_chat : item.initiator_chat;
                                if (username !== item.initiator.username) {
                                    return (

                                        <div onClick={() => setChangeUser(item)} key={item.id} className="flex cursor-pointer rounded-2xl gap-2.5 px-2 py-2 items-center hover:bg-blue-gray-300">
                                            <Avatar size="md" variant="circular" src={item.initiator_chat.picture ? item.initiator_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                            <span>{otherUser.fullname} {otherUser.surname}</span>
                                        </div>
                                    )
                                } else if(username !== item.receiver.username) {
                                    return (

                                        <div onClick={() => setChangeUser(item)} key={item.id} className="flex cursor-pointer rounded-2xl gap-2.5 px-2 py-2 items-center hover:bg-blue-gray-300">
                                            <Avatar size="md" variant="circular" src={item.receiver_chat.picture ? item.receiver_chat.picture.replace('/', 'http://127.0.0.1:8000/') : "/assets/images/avatar_default.png"} />
                                            <span>{otherUser.fullname} {otherUser.surname}</span>
                                        </div>
                                    )
                                }
                                return null;
                            }
                            )}
                        </div>

                    }
                </div>
            </section>
        </>
    );
};