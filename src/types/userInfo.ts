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
    user_skills: any;
    user_experience: {
        id: string;
        experience_years: string;
        experience: string[];
    },
}