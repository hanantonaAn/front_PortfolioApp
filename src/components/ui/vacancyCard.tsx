import { IVacancy } from "@/types/vacancy";
import { useState } from "react";

type Props = {
    vacancy: IVacancy;
    likeVacancy: () => void;
}

export const VacancyCard = ({ vacancy, likeVacancy }: Props) => {

    const [alwaysOpen, setAlwaysOpen] = useState<boolean>(false);

    const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
    return (
        <div className="group h-full flex flex-col bg-white rounded-2xl p-4 transition-all duration-300 hover:rotate-1 lg:p-8">
            <div className="mb-3 text-right">
                <button onClick={likeVacancy} className={vacancy.status === "favorites" ? "hover:text-gray-600 transition-all duration-300 hover:scale-110 text-red-600" : "text-gray-600 transition-all duration-300 hover:scale-110 hover:text-red-600"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </button>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-700">{vacancy.name}</h3>
                <span className="text-xs text-gray-600">{vacancy.area}</span>
            </div>
            <div className="my-4">
                <h3 className="text-2xl font-medium text-gray-600">{vacancy.role}</h3>
                <div className="mt-2 text-sm text-gray-600">{vacancy.salary_from}р</div>
            </div>
            <div className="flex items-center mt-auto justify-between">
                <span onClick={handleAlwaysOpen} className="text-sm font-medium text-gray-500 cursor-pointer">{alwaysOpen ? "Свернуть" : "Развернуть"}</span>
                <a href={vacancy.url} target="_blank" referrerPolicy="no-referrer" className="font-medium text-blue-500 transition-all duration-300 group-hover:text-blue-500/80">Откликнуться</a>
            </div>
            {alwaysOpen &&
                <div className="flex flex-col mt-5">
                    <div className="mt-2 text-base text-gray-700">{vacancy.company}</div>
                    <div className="mt-2 text-sm text-gray-500">{vacancy.requirements}</div>
                    <div className="mt-2 text-sm text-gray-500">{vacancy.responsobility}</div>
                    <div className="mt-2 text-sm text-gray-600">{vacancy.scedule}</div>
                    <div className="mt-2 text-sm text-gray-600">{vacancy.experience}</div>
                </div>
            }
        </div>
    );
};