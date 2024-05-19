import { IExperience } from "@/types/experience";
import { Card } from "@material-tailwind/react";

type Props = {
    experience: Pick<IExperience, 'position' | 'company' | 'experience_years' | 'experience_info'>;
}

const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}

export const ExperienceWidget = ({ experience }: Props) => {
    return (
        <Card className="mb-3 bg-white shadow rounded-lg p-6">
            <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">{experience.position}</span>
                <p className="flex flex-col">
                    <span className="text-gray-700 mr-2">Компания: {experience.company}</span>
                    <span className="text-gray-700">Опыт работы: {experienceObj[experience.experience_years]}</span>
                </p>
            </div>
            <p className="mt-2">
                Описание: {experience.experience_info}
            </p>
        </Card>
    );
};