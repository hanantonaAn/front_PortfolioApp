import { IForm } from "@/types/form";
import { IAdvancedSearchType } from "@/utils/yupSchema";

// форма регистрации
export const advancedSearchForm: IForm<IAdvancedSearchType>[] = [
    {
        fieldName: "username",
        type: "input",
        placeholder: "Поиск по username",
        label: "Поиск по username"
    },
    {
        fieldName: "languages",
        type: "input",
        placeholder: "Поиск по языку",
        label: "Поиск по языку"
    },
    {
        fieldName: "skills",
        type: "input",
        placeholder: "Поиск по скиллам",
        label: "Поиск по скиллам"
    },
    {
        fieldName: "education_level",
        type: "select",
        label: "Поиск по образованию",
        options: [
            {
                value: "secondary",
                label: "Среднее"
            },
            {
                value: "special_secondary",
                label: "Среднее специальное"
            },
            {
                value: "unfinished_higher",
                label: "Неоконченное высшее"
            },
            {
                value: "higher",
                label: "Высшее"
            },
            {
                value: "bachelor",
                label: "Бакалавр"
            },
            {
                value: "master",
                label: "Магистр"
            },
            {
                value: "candidate",
                label: "Кандидат наук"
            },
            {
                value: "doctor",
                label: "Доктор наук"
            }
        ]
    },
    {
        fieldName: "experience",
        type: "input",
        placeholder: "Поиск по опыту",
        label: "Поиск по опыту"
    },
    {
        fieldName: "experience_years",
        type: "select",
        label: "Опыт работы",
        options: [
            {
                value: "noExperience",
                label: "Нет опыта"
            },
            {
                value: "between1And3",
                label: "От 1 года до 3 лет"
            },
            {
                value: "between3And6",
                label: "От 3 до 6 лет"
            },
            {
                value: "moreThan6",
                label: "Более 6 лет"
            }
        ]
    }
];