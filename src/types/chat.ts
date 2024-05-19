export type IChat = {
    id: number;
    initiator: {
        username: string;
    };
    receiver: {
        username: string;
    };
    last_message: {
        id: number;
        text: string;
        attachment: null;
        timestamp: string;
        sender: string;
    };
    initiator_chat: {
        fullname: string;
        surname: string;
        picture: string;
        status: string;
    };
    receiver_chat: {
        fullname: null;
        surname: null;
        picture: string;
        status: string;
    };
}


export type IMessage = {
    id: number;
    attachment: null;
    sender: string;
    text: string;
    timestamp: string;
}

export type IChatAndMessage = {
    id: number;
    initiator: {
        username: string;
    };
    receiver: {
        username: string;
    };
    message_set: IMessage[];
    initiator_chat: {
        fullname: string;
        surname: string;
        picture: string;
        status: string;
    };
    receiver_chat: {
        fullname: string;
        surname: string;
        picture: null;
        status: string;
    };
}