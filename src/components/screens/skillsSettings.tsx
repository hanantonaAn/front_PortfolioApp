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

type Props = {
    redirect?: boolean;
}

export const SkillsSettingsScreen = ({ redirect }: Props) => {

    const { data: skills } = useGetUserSkillsByUserQuery();

    const username = useAppSelector(state => state.auth.username)

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<ISkillsType>({
        resolver: yupResolver(SkillsSchema),
    });

    const [tags, setTags] = useState<IFormTagsKey>({ experience: [] });
    const router = useRouter()

    useEffect(() => {
        if (skills && skills.length > 0) {
            reset({
                ...skills[0],
                skills: ''
            })
            setTags((prev) => ({
                ...prev,
                experience: skills[0].skills
            }))
        }
    }, [skills])

    const [createSkills] = useCreateUserSkillsByUserMutation();
    const [updateSkills] = useUpdateUsersSkillsByUserMutation();

    const submitForm: SubmitHandler<ISkillsType> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (["skills"].includes(key)) {
                formData.append(key, JSON.stringify(tags[key as keyof typeof tags]));
            }
        });
        if (skills && skills.length > 0) {
            toast.promise(
                updateSkills({ id: skills[0].id, data: formData }).unwrap(),
                {
                  loading: 'Сохранение...',
                  success: () => `Умения успешно добавлены`,
                  error: () => `Произошла ошибка`
                }
              )
        } else {
            toast.promise(
                createSkills(formData).unwrap(),
                {
                  loading: 'Сохранение...',
                  success: () => `Умения успешно добавлены`,
                  error: () => `Произошла ошибка`
                }
              )
        }
        if(redirect) {
            router.push(`/profile/${username}`)
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