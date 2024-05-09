import { LegacyRef, useEffect, useState } from "react";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISkillsType, SkillsSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { IFormTagsKey } from "@/types/form";
import { skillsForm } from "@/forms/skillsForm";
import { useCreateUserSkillsByUserMutation, useGetUserSkillsByUserQuery, useUpdateUsersSkillsByUserMutation } from "@/service/usersSkillByUserService";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { ISkills } from "@/types/skills";

type Props = {
    redirect?: boolean;
}

export const SkillsSettingsScreen = ({ redirect }: Props) => {

    const { data: skills } = useGetUserSkillsByUserQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });

    const user = useAppSelector(state => state.auth.me)

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<ISkillsType>({
        resolver: yupResolver(SkillsSchema),
    });

    const [tags, setTags] = useState<IFormTagsKey>({ skills: [] });
    const router = useRouter()

    useEffect(() => {
        if (skills && skills.length > 0) {
            reset({
                ...skills[0],
                skills: ''
            })
            setTags((prev) => ({
                ...prev,
                skills: skills[0].skills
            }))
        }
    }, [skills])

    const [createSkills] = useCreateUserSkillsByUserMutation();
    const [updateSkills] = useUpdateUsersSkillsByUserMutation();

    const submitForm: SubmitHandler<ISkillsType> = (data) => {
        const Data: Partial<ISkills> = {
            skills: tags?.skills?.length > 0 ? tags.skills : []
        }
        if (skills && skills.length > 0) {
            toast.promise(
                updateSkills({ id: skills[0].id, data: Data }).unwrap(),
                {
                    loading: 'Сохранение...',
                    success: () => `Умения успешно добавлены`,
                    error: () => `Произошла ошибка`
                }
            )
        } else {
            toast.promise(
                createSkills(Data).unwrap(),
                {
                    loading: 'Сохранение...',
                    success: () => `Умения успешно добавлены`,
                    error: () => `Произошла ошибка`
                }
            )
        }
        if (redirect) {
            router.push(`/profile/${user?.username}`)
        }
    };

    return (
        <FormConstructor fieldList={skillsForm}
            onSubmit={handleSubmit(data => submitForm(data))}
            register={register}
            inputClassName="grid grid-cols-1 gap-4"
            control={control}
            tags={tags}
            setTags={setTags}
            errors={errors}>

            <Button type="submit" color="light-blue" className="mt-5">
                Сохранить
            </Button>
        </FormConstructor>
    );
}