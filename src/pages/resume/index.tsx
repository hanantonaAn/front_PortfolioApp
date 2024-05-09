import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useEffect, useRef } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import React from "react";
import { StepperComponent } from "@/components/layout/stepperLayoyt";
import { useGetUserDataByUserQuery } from "@/service/userDataByUserService";
import { useCreateUserExperienceByUserMutation, useGetUserExperienceByUserQuery, useUpdateUserExperienceByUserMutation } from "@/service/userExperienceByUserService";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { IExperience } from "@/types/experience";
import toast from "react-hot-toast";
import { ExperienceSchema, IExperienceType } from "@/utils/yupSchema";
import { experienceForm } from "@/forms/experienceForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileSettingsScreen } from "@/components/screens/settingsScreen/profileSettings";
import { SkillsSettingsScreen } from "@/components/screens/settingsScreen/skillsSettings";


const Resume = () => {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    const profileRef = useRef<any>(null);
    const experienceRef = useRef<any>(null);

    const { data: profile } = useGetUserDataByUserQuery();
    const { data: experience } = useGetUserExperienceByUserQuery();


    useEffect(() => {
        if (profile && profile.length > 0) {
            setActiveStep(prev => prev = 1)
        }
        if (experience && experience.length > 0) {
            setActiveStep(prev => prev = 2)
        }
    }, [profile, experience])

    const handleNext = () => {
        if (activeStep === 0) {
            profileRef.current.click()
        }
        if (activeStep === 1) {
            experienceRef.current.click()
        }
        setActiveStep((cur) => cur + 1)
    };
    const handlePrev = () => setActiveStep((cur) => cur - 1);


    const { register, control, reset, handleSubmit, formState: { errors } } = useForm<IExperienceType>({
        resolver: yupResolver(ExperienceSchema),
    });


    useEffect(() => {
        if (experience && experience?.length > 0) {
            reset(experience[0])
        }
    }, [experience])

    const [createExperience] = useCreateUserExperienceByUserMutation();
    const [updateExperience] = useUpdateUserExperienceByUserMutation();

    const submitForm: SubmitHandler<IExperienceType> = (data) => {
        const Data: Partial<IExperience> = {
            experience_info: data.experience_info,
            experience_years: data.experience_years,
            position: data.position,
            company: data.company
        }
        if (experience && experience?.length > 0) {
            toast.promise(
                updateExperience({ id: experience[0]?.id, data: Data }).unwrap(),
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
        <AuthWrapper>
            <PageLayout>
                <Wrapper>
                    <StepperComponent
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    >
                        {activeStep === 0 && <ProfileSettingsScreen submitRef={profileRef} />}
                        {activeStep === 1 &&
                            <div className="w-full grid grid-cols-1 gap-5">
                                <FormConstructor fieldList={experienceForm}
                                    onSubmit={handleSubmit(data => submitForm(data))}
                                    register={register}
                                    inputClassName="grid grid-cols-1 gap-4"
                                    control={control}
                                    errors={errors}>
                                    {experienceRef && <button ref={experienceRef} type="submit" style={{ display: 'none' }} />}
                                </FormConstructor>
                            </div>
                        }
                        {activeStep === 2 && <SkillsSettingsScreen redirect />}
                    </StepperComponent>
                </Wrapper>
            </PageLayout>
        </AuthWrapper>
    );
}

Resume.getLayout = function getLayout(page: ReactElement) {
    return (
        <HeadLayout title="Создание резюме" description="Создание резюме" keywords="Создание резюме">
            {page}
        </HeadLayout>
    )
}

export default Resume;