import { IForm } from "@/types/form";
import { ISkillsType } from "@/utils/yupSchema";

// форма логина
export const skillsForm: IForm<ISkillsType>[] = [
    {
        fieldName: "skills",
        type: "inputByTags",
        placeholder: "Умения",
        label: "Напишите Ваши умения"
    },
];