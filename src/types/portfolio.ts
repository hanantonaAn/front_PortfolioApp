import { IExperience } from "./experience";
import { ISlider } from "./slider";
import { IUser } from "./user";

export type IPortfolio = {
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
}

export type IPortfolioUsername = {
    user: IUser;
    portfolio: IPortfolio;
    text: any;
    photo: any;
    slider: ISlider[];
    user_experience: IExperience[];
}