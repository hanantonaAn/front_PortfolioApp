import { LegacyRef, useEffect, useState } from "react";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExperienceSchema, IExperienceType } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { experienceForm } from "@/forms/experienceForm";
import { useCreateUserExperienceByUserMutation, useGetUserExperienceByUserQuery, useUpdateUserExperienceByUserMutation } from "@/service/userExperienceByUserService";
import toast from "react-hot-toast";
import { IExperience } from "@/types/experience";
import { Button } from "@material-tailwind/react";

type Props = {
    children?: React.ReactNode;
    submitRef?: LegacyRef<HTMLButtonElement>;
}


export const ExperienceSettingsScreen = ({ children, submitRef }: Props) => {

    const { data: experience } = useGetUserExperienceByUserQuery();


    return (
        <>
            {experience && experience.length > 0 ? experience?.map((item: any) => {
                return (
                    <HelpComponent experience={item} key={item.id} submitRef={submitRef}>
                        {children}
                    </HelpComponent>
                )
            })
                :
                <HelpComponent submitRef={submitRef}>
                    {children}
                </HelpComponent >
            }
            <Button color="blue">Добавить ещё опыт</Button>
        </>
    );
}


type HelpProps = {
    children?: React.ReactNode;
    submitRef?: LegacyRef<HTMLButtonElement>;
    experience?: IExperience;
}

const HelpComponent = ({ children, submitRef, experience }: HelpProps) => {
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<IExperienceType>({
        resolver: yupResolver(ExperienceSchema),
    });


    useEffect(() => {
        if (experience) {
            reset(experience)
        }
    }, [experience])

    const [createExperience] = useCreateUserExperienceByUserMutation();
    const [updateExperience] = useUpdateUserExperienceByUserMutation();

    const submitForm: SubmitHandler<IExperienceType> = (data) => {
        const Data: Partial<IExperience> = {
            experience_years: data.experience_years,
            position: data.position,
            company: data.company
        }
        if (experience) {
            toast.promise(
                updateExperience({ id: experience.id, data: Data }).unwrap(),
                {
                    loading: 'Сохранение...',
                    success: () => `Данные успешно обновлены`,
                    error: () => `Произошла ошибка`
                }
            )
        } else {
            toast.promise(
                createExperience(Data).unwrap(),
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
            errors={errors}>
            {submitRef && <button ref={submitRef} type="submit" style={{ display: 'none' }} />}
            {children}
        </FormConstructor>
    );
};