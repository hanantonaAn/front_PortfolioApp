import { LegacyRef, useEffect, useState } from "react";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExperienceSchema, IExperienceType } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { IFormTagsKey } from "@/types/form";
import { experienceForm } from "@/forms/experienceForm";
import { useCreateUserExperienceByUserMutation, useGetUserExperienceByUserQuery, useUpdateUserExperienceByUserMutation } from "@/service/userExperienceByUserService";
import toast from "react-hot-toast";

type Props = {
    children?: React.ReactNode;
    submitRef?: LegacyRef<HTMLButtonElement>;
}


export const ExperienceSettingsScreen = ({ children, submitRef }: Props) => {

    const { data: experience } = useGetUserExperienceByUserQuery();

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<IExperienceType>({
        resolver: yupResolver(ExperienceSchema),
    });

    const [tags, setTags] = useState<IFormTagsKey>({ experience: [] });

    useEffect(() => {
        if (experience && experience.length > 0) {
            reset({
                ...experience[0],
                experience: ''
            })
            setTags((prev) => ({
                ...prev,
                experience: experience[0].experience
            }))
        }
    }, [experience])

    const [createExperience] = useCreateUserExperienceByUserMutation();
    const [updateExperience] = useUpdateUserExperienceByUserMutation();

    const submitForm: SubmitHandler<IExperienceType> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "picture") {
                formData.append(key, value);
            } else if (["experience"].includes(key)) {
                formData.append(key, JSON.stringify(tags[key as keyof typeof tags]));
            } else if (value) {
                formData.append(key, value);
            }
        });
        if (experience && experience.length > 0) {
            toast.promise(
                updateExperience({ id: experience[0].id, data: formData }).unwrap(),
                {
                  loading: 'Сохранение...',
                  success: () => `Данные успешно обновлены`,
                  error: () => `Произошла ошибка`
                }
              )
        } else {
            toast.promise(
                createExperience(formData).unwrap(),
                {
                  loading: 'Сохранение...',
                  success: () => `Опыт успешно создан`,
                  error: () => `Произошла ошибка`
                }
              )
        }
    };

    return (
        <FormConstructor fieldList={experienceForm}
            onSubmit={handleSubmit(data => submitForm(data))}
            register={register}
            inputClassName="grid grid-cols-1 gap-4"
            control={control}
            tags={tags}
            setTags={setTags}
            errors={errors}>
                {submitRef && <button ref={submitRef} type="submit" style={{ display: 'none' }} />}
            {children}
        </FormConstructor>
    );
}