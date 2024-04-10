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
    status: Yup.string(),
    additional_info: Yup.string(),
    fullname: Yup.string(),
    surname: Yup.string(),
    lastname: Yup.string(),
    phone_number: Yup.string(),
    contact_telegram: Yup.string(),
    contact_email: Yup.string(),
    city: Yup.string(),
    date_of_birth: Yup.string(),
    sex: Yup.string(),
    graduation_place: Yup.string(),
    education_level: Yup.string(),
    graduation_date: Yup.string(),
    languages: Yup.string(),
    curses: Yup.string(),
    picture: Yup.mixed(),
});

export type IProfileType = Yup.InferType<typeof ProfileSchema>;


// форма опыт
export const ExperienceSchema = Yup.object({
    experience_years: Yup.string(),
    experience: Yup.string(),
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
    languages: Yup.string(),
    skills: Yup.string(),
    education_level: Yup.string(),
    experience: Yup.string(),
    experience_years: Yup.string()
});

export type IAdvancedSearchType = Yup.InferType<typeof AdvancedSearchSchema>;