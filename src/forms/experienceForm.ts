import { IForm } from "@/types/form";
import { IExperienceType } from "@/utils/yupSchema";

// форма логина
export const experienceForm: IForm<IExperienceType>[] = [
    {
        fieldName: "experience",
        type: "input",
        placeholder: "Опыт",
        label: "Напишите Ваш опыт"
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
    },
    {
        fieldName: "position",
        type: "input",
        placeholder: "Должность",
        label: "Напишите свою должность"
    },
    {
        fieldName: "company",
        type: "input",
        placeholder: "Компания",
        label: "Напишите свою компанию"
    },
];