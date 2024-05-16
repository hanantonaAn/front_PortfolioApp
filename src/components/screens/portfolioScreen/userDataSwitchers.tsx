import { useUpdateUserDataByUserMutation } from "@/service/userDataByUserService";
import { UserInfoSolo } from "@/types/userInfo";
import { Checkbox, Switch, Tooltip, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";

type Props = {
    userByName: UserInfoSolo;
    openEditor: boolean;
}

export const UserDataSwitchers = ({ userByName, openEditor }: Props) => {

    const elements = [
        ...(userByName?.user_data?.status ? [{ id: "status_show", name: `Статус: ${userByName.user_data.status}`, isVisible: userByName.user_data.status_show }] : []),
        ...(userByName?.user_data?.contact_telegram ? [{ id: "contact_telegram_show", name: `Telegram: ${userByName.user_data.contact_telegram}`, isVisible: userByName.user_data.contact_telegram_show }] : []),
        ...(userByName?.user_data?.phone_number ? [{ id: "phone_number_show", name: `Телефон: ${userByName.user_data.phone_number}`, isVisible: userByName.user_data.phone_number_show }] : []),
        ...(userByName?.user_data?.contact_email ? [{ id: "contact_email_show", name: `E-mail: ${userByName.user_data.contact_email}`, isVisible: userByName.user_data.contact_email_show }] : []),
        ...(userByName?.user_data?.city ? [{ id: "city_show", name: `Город: ${userByName.user_data.city}`, isVisible: userByName.user_data.city_show }] : []),
        ...(userByName?.user_data?.date_of_birth ? [{ id: "date_of_birth_show", name: `Дата рождения: ${userByName.user_data.date_of_birth}`, isVisible: userByName.user_data.date_of_birth_show }] : []),
        ...(userByName?.user_data?.sex ? [{ id: "sex_show", name: `Пол: ${userByName.user_data.sex}`, isVisible: userByName.user_data.sex_show }] : []),
        ...(userByName?.user_data?.languages && userByName.user_data.languages.length > 0 ? [{ id: "languages_show", name: `Языки: ${userByName.user_data.languages.join(', ')}`, isVisible: userByName.user_data.languages_show }] : []),
        ...(userByName?.user_data?.curses && userByName.user_data.curses.length > 0 ? [{ id: "curses_show", name: `Курсы: ${userByName.user_data.curses.join(', ')}`, isVisible: userByName.user_data.curses_show }] : []),
        ...(userByName?.user_data?.education_level ? [{ id: "education_level_show", name: `Образование: ${userByName.user_data.education_level}`, isVisible: userByName.user_data.education_level_show }] : []),
        ...(userByName?.user_data?.graduation_place ? [{ id: "graduation_place_show", name: `Учебное заведение: ${userByName.user_data.graduation_place}`, isVisible: userByName.user_data.graduation_place_show }] : []),
        ...(userByName?.user_data?.graduation_date ? [{ id: "graduation_date_show", name: `Дата окончания: ${userByName.user_data.graduation_date}`, isVisible: userByName.user_data.graduation_date_show }] : []),
    ];


    const [updateUserData] = useUpdateUserDataByUserMutation();


    const updatePublic = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = event.target.checked;
        if (userByName && userByName.user_portfolio) {
            toast.promise(
                updateUserData({
                    id: userByName.user_data.id,
                    data: {
                        [id]: isChecked
                    }
                }),
                {
                    loading: 'Изменение...',
                    success: () => `Видимость портфолио успешно изменено`,
                    error: () => `Произошла ошибка`
                }
            )
        }
    };


    return (
        <ul className="mb-5">
            {elements.map((elem) => (
                openEditor ?
                    <li key={elem.id}>
                        <Tooltip className="!z-[10000]" content="Вы уверены, что хотите изменить видимость?" placement="top">
                            <Checkbox onChange={(e) => updatePublic(e, elem.id)} checked={elem.isVisible} label={elem.name} ripple={true} />
                        </Tooltip>
                    </li>
                    :
                    <li key={elem.id} className="mb-2">
                        {elem.name}
                    </li>
            ))
            }
        </ul>
    );
};