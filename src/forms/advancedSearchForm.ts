import { IForm } from "@/types/form";
import { ISphere } from "@/types/sphere";
import { IAdvancedSearchType } from "@/utils/yupSchema";

export const PreparedSearchForm = (optionsShpere?: ISphere[] ) => {
    const awaitSphera = optionsShpere ? optionsShpere.map(x => {
        return {
            value: x.id,
            label: x.sphere
        }
    }) : [];
    const advancedSearchForm: IForm<IAdvancedSearchType>[] = [
        {
            fieldName: "username",
            type: "input",
            placeholder: "Поиск по username",
            label: "Поиск по username"
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
            fieldName: "shpere",
            type: "select",
            label: "Поиск по сфере",
            options: awaitSphera
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
    return advancedSearchForm;
};
