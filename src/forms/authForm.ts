import { IForm } from "@/types/form";
import { ISignInType, ISignUpType } from "@/utils/yupSchema";

// форма регистрации
export const authSignUpForm: IForm<ISignUpType>[] = [
    {
        fieldName: "email",
        type: "input",
        placeholder: "E-mail",
        label: "E-mail"
    },
    {
        fieldName: "username",
        type: "input",
        placeholder: "Логин",
        label: "Логин"
    },
    {
        fieldName: "password",
        type: "input",
        placeholder: "Пароль",
        password: true,
        label: "Пароль"
    },
    {
        fieldName: "re_password",
        type: "input",
        placeholder: "Повторите пароль",
        password: true,
        label: "Повторите пароль"
    }
];


// форма логина
export const authLoginForm: IForm<ISignInType>[] = [
    {
        fieldName: "username",
        type: "input",
        placeholder: "E-mail",
        label: "E-mail"
    },
    {
        fieldName: "password",
        type: "input",
        placeholder: "Пароль",
        label: "Пароль"
    }
];