import { UserDataByUser } from "./userDataByUser";

export type UserInfo = {
    user: {
        username: string;
        email: string;
    };
    user_data: UserDataByUser[];
}


export type UserInfoSolo = {
    user: {
        username: string;
        email: string;
    };
    user_data: UserDataByUser;
}