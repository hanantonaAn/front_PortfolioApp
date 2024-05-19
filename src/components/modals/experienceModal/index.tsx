import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    Tooltip,
    Card,
    Checkbox,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import { IPortfolioUsername } from "@/types/portfolio";
import { useUpdateUserExperienceByUserMutation } from "@/service/userExperienceByUserService";
import toast from "react-hot-toast";


type Props = {
    open: boolean;
    handleOpen: () => void;
    portfolio: IPortfolioUsername;
}

const experienceObj: { [key: string]: string } = {
    noExperience: "Нет опыта",
    between1And3: "От 1 года до 3 лет",
    between3And6: "От 3 до 6 лет",
    moreThan6: "Более 6 лет"
}

export const ExperienceModal = ({ open, handleOpen, portfolio }: Props) => {
    const [updateExperience] = useUpdateUserExperienceByUserMutation();

    const changeExperience = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = event.target.checked;
        toast.promise(
            updateExperience({
                id: id,
                data: {
                    show: isChecked
                }
            }),
            {
                loading: 'Изменение...',
                success: () => `Видимость опыта успешно изменено`,
                error: () => `Произошла ошибка`
            }
        )
    };

    return (
        <Dialog size="lg" open={open} handler={handleOpen}>
            <DialogHeader className="justify-between">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Отображать опыт
                    </Typography>
                    <Typography color="gray" variant="paragraph">
                        Выберите опыт, который нужно отображать
                    </Typography>
                </div>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
                    onClick={handleOpen}
                >
                    <MdClose size={28} />
                </IconButton>
            </DialogHeader>
            <DialogBody className="!px-5">
                <div className="mb-6">
                    {portfolio.user_experience.map(item => {
                        return (
                            <Card key={item.id} className="mb-3 bg-white shadow rounded-lg p-6">
                                <Tooltip className="!z-[10000]" content="Вы уверены, что хотите изменить видимость?" placement="top">
                                    <Checkbox onChange={(e) => changeExperience(e, item.id)} checked={item.show} label="Отображать/скрыть" ripple={true} />
                                </Tooltip>
                                <div className="flex justify-between flex-wrap gap-2 w-full">
                                    <span className="text-gray-700 font-bold">{item.position}</span>
                                    <p className="flex flex-col">
                                        <span className="text-gray-700 mr-2">Компания: {item.company}</span>
                                        <span className="text-gray-700">Опыт работы: {experienceObj[item.experience_years]}</span>
                                    </p>
                                </div>
                                <p className="mt-2">
                                    Описание: {item.experience_info}
                                </p>
                            </Card>
                        )
                    })}
                </div>
            </DialogBody>
            <DialogFooter className="justify-between gap-2">
                <Tooltip className="!z-[10000]" content="Редактируйте отображаемый опыт" placement="top">
                    <InformationCircleIcon width={24} height={24} />
                </Tooltip>
                <div className="flex items-center gap-2">
                    <Tooltip className="!z-[10000]" content="Отменить выбор" placement="top">
                        <Button onClick={handleOpen} color="red" size="sm">
                            Закрыть
                        </Button>
                    </Tooltip>
                    <Tooltip className="!z-[10000]" content="Сохранить выбор" placement="top">
                        <Button onClick={handleOpen} color="green" size="sm">
                            Сохранить
                        </Button>
                    </Tooltip>
                </div>
            </DialogFooter>
        </Dialog>
    );
}