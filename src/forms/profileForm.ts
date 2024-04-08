import { IForm } from "@/types/form";
import { IProfileType } from "@/utils/yupSchema";

// форма логина
export const profileForm: IForm<IProfileType>[] = [
    {
        fieldName: "status",
        type: "input",
        placeholder: "Статус",
        label: "Добавить статус"
    },
    {
        type: "title",
        label: "Контактная информация"
    },
    {
        fieldName: "contact_telegram",
        type: "input",
        placeholder: "@telegram",
        label: "Telegram"
    },
    {
        fieldName: "phone_number",
        type: "input",
        placeholder: "Телефон",
        label: "Номер телефона"
    },
    {
        fieldName: "contact_email",
        type: "input",
        placeholder: "@email",
        label: "Электронная почта"
    },
    {
        type: "title",
        label: "Основная информация"
    },
    {
        fieldName: "fullname",
        type: "input",
        placeholder: "Имя",
        label: "Имя"
    },
    {
        fieldName: "surname",
        type: "input",
        placeholder: "Фамилия",
        label: "Фамилия"
    },
    {
        fieldName: "lastname",
        type: "input",
        placeholder: "Отчество",
        label: "Отчество"
    },
    {
        fieldName: "city",
        type: "input",
        placeholder: "Город",
        label: "Город проживания"
    },
    {
        fieldName: "date_of_birth",
        type: "input",
        placeholder: "00.00.0000",
        label: "Дата рождения"
    },
    {
        fieldName: "sex",
        type: "input",
        placeholder: "Пол",
        label: "Пол"
    },
    {
        type: "title",
        label: "Контактная информация"
    },
    {
        fieldName: "languages",
        type: "input",
        placeholder: "Языки",
        label: "Иностранные языки"
    },
    {
        fieldName: "curses",
        type: "input",
        placeholder: "Курсы",
        label: "Оконченные курсы"
    },
    {
        fieldName: "education_level",
        type: "input",
        placeholder: "Образование",
        label: "Уровень образования"
    },
    {
        fieldName: "graduation_place",
        type: "input",
        placeholder: "Учебное заведение",
        label: "Название"
    },
    {
        fieldName: "graduation_date",
        type: "input",
        placeholder: "Дата окончания",
        label: "Дата"
    },
    {
        fieldName: "additional_info",
        type: "input",
        placeholder: "Дополнительная информация",
        label: "Введите"
    },
    {
        fieldName: "picture",
        type: "image",
        placeholder: "Изменить фото профиля",
        label: "Загрузите фото"
    },
];