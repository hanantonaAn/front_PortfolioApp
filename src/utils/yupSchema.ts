import * as Yup from "yup";

// Форма регистрации
export const SignUpSchema = Yup.object({
    email: Yup.string().email('Неправильный формат email').required('Обязательное поле'),
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым'),
    re_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле обязательно'),
})

export type ISignUpType = Yup.InferType<typeof SignUpSchema>;


// форма логина
export const SignInSchema = Yup.object({
    username: Yup.string().email('Неправильный формат email').required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым')
});

export type ISignInType = Yup.InferType<typeof SignInSchema>;