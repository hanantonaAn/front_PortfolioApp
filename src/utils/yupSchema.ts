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
    termsAccepted: Yup.boolean()
        .oneOf([true], 'Вы должны согласиться с условиями пользования')
        .required('Обязательное поле'),
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


// форма создания/редактирования профиля
export const ProfileSchema = Yup.object({
    status: Yup.string().nullable(),
    position: Yup.string().nullable(),
    additional_info: Yup.string().nullable(),
    fullname: Yup.string().nullable(),
    surname: Yup.string().nullable(),
    lastname: Yup.string().nullable(),
    phone_number: Yup.string().nullable(),
    contact_telegram: Yup.string().nullable(),
    contact_email: Yup.string().nullable(),
    city: Yup.string().nullable(),
    date_of_birth: Yup.string().nullable(),
    sex: Yup.string().nullable(),
    graduation_place: Yup.string().nullable(),
    education_level: Yup.string().nullable(),
    graduation_date: Yup.string().nullable(),
    languages: Yup.string().nullable(),
    curses: Yup.string().nullable(),
    picture: Yup.mixed(),
});

export type IProfileType = Yup.InferType<typeof ProfileSchema>;


// форма опыт
export const ExperienceSchema = Yup.object({
    experience_years: Yup.string(),
    experience_info: Yup.string(),
    position: Yup.string(),
    company: Yup.string(),
});

export type IExperienceType = Yup.InferType<typeof ExperienceSchema>;



// форма скиллов
export const SkillsSchema = Yup.object({
    skills: Yup.string(),
});

export type ISkillsType = Yup.InferType<typeof SkillsSchema>;


// форма расширенного поиска
export const AdvancedSearchSchema = Yup.object({
    username: Yup.string(),
    education_level: Yup.string(),
    experience_years: Yup.string(),
    shpere: Yup.string()
});

export type IAdvancedSearchType = Yup.InferType<typeof AdvancedSearchSchema>;