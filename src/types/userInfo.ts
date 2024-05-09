import { IExperience } from "./experience";
import { IPortfolio } from "./portfolio";
import { ISkills } from "./skills";
import { UserDataByUser } from "./userDataByUser";

export type UserInfo = {
    user: {
        id: string;
        username: string;
        email: string;
    };
    user_data: UserDataByUser[];
    user_skills: ISkills[];
    user_experience: IExperience[];
    user_portfolio: IPortfolio[];
}


export type UserInfoSolo = {
    user: {
        id: string;
        username: string;
        email: string;
    };
    user_data: UserDataByUser;
    user_skills: {
        id: string;
        skills: string[];
    };
    user_experience: {
        id: string;
        experience_years: string;
        experience_info: string;
        position: string;
        company: string;
    }[],
    user_portfolio: {
        id: string;
        portfolio_html: string;
        portfolio_text: string;
        public: boolean;
        sphere_id: string;
        heading_ids: string[];
        link_ids: string[];
        textfield_ids: string[];
        list_ids: string[];
        photo_ids: string[];
        slider_ids: string[];
        hashtag_ids: string[];
    };
}