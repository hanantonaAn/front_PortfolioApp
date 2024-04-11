import { LegacyRef, useEffect, useState } from "react";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfileType, ProfileSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { profileForm } from "@/forms/profileForm";
import { IFormTagsKey } from "@/types/form";
import { useCreateUserDataByUserMutation, useGetUserDataByUserQuery, useUpdateUserDataByUserMutation } from "@/service/userDataByUserService";
import toast from "react-hot-toast";

type Props = {
    children?: React.ReactNode;
    submitRef?: LegacyRef<HTMLButtonElement>;
}

export const ProfileSettingsScreen = ({ children, submitRef }: Props) => {
    const { data: profile } = useGetUserDataByUserQuery();

    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<IProfileType>({
        resolver: yupResolver(ProfileSchema),
        defaultValues: {
            status: '',
            additional_info: '',
            fullname: '',
            surname: '',
            lastname: '',
            phone_number: '',
            contact_telegram: '',
            contact_email: '',
            city: '',
            date_of_birth: '',
            sex: '',
            graduation_place: '',
            education_level: '',
            graduation_date: '',
            languages: '',
            curses: '',
            picture: ''
        }
    });

    const [tags, setTags] = useState<IFormTagsKey>({ languages: [], curses: [] });

    useEffect(() => {
        if (profile && profile.length > 0) {
            reset({
                ...profile[0],
                languages: '',
                curses: ''
            })
            setTags((prev) => ({
                ...prev,
                languages: profile[0]?.languages && [],
                curses: profile[0]?.curses || []
            }))
        }
    }, [profile, reset])

    const [createProfile] = useCreateUserDataByUserMutation();
    const [updateProfile] = useUpdateUserDataByUserMutation();

    const submitForm: SubmitHandler<IProfileType> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(async ([key, value]) => {
            if (key === "picture") {
                if (typeof value === 'string') {
                    const response = await fetch(value, {
                        referrerPolicy: 'unsafe-url',
                        mode: 'cors'
                    });
                    const blob = await response.blob();
                    const newFile = new File([blob], 'filename', { type: blob.type });
                    formData.append(key, newFile);
                } else {
                    formData.append(key, value);
                }
            } else if (["languages", "curses"].includes(key)) {
                const valuesArray = tags && tags[key as keyof typeof tags];
                valuesArray.forEach(item => {
                    formData.append(key, item);
                });
            } else if (value) {
                formData.append(key, value);
            }
        });
        if (profile && profile.length > 0) {
            toast.promise(
                updateProfile({ id: profile[0].id, data: formData }).unwrap(),
                {
                    loading: 'Сохранение...',
                    success: () => `Профиль обновлен`,
                    error: () => `Произошла ошибка`
                }
            )
        } else {
            toast.promise(
                createProfile(formData).unwrap(),
                {
                    loading: 'Сохранение...',
                    success: () => `Профиль успешно обновлен`,
                    error: () => `Произошла ошибка`
                }
            )
        }
    };
    return (
        <FormConstructor fieldList={profileForm}
            onSubmit={handleSubmit(data => submitForm(data))}
            register={register}
            inputClassName="grid grid-cols-1 gap-2"
            formClassName="max-w-1/2"
            control={control}
            tags={tags}
            setTags={setTags}
            errors={errors}>
            {submitRef && <button ref={submitRef} type="submit" style={{ display: 'none' }} />}
            {children}
        </FormConstructor>
    );
};