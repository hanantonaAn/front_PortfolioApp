import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useEffect, useRef } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Wrapper } from "@/components/layout/wrapper";
import React from "react";
import { StepperComponent } from "@/components/layout/stepperLayoyt";
import { ProfileSettingsScreen } from "@/components/screens/profileSettings";
import { ExperienceSettingsScreen } from "@/components/screens/experienceSettings";
import { useGetUserDataByUserQuery } from "@/service/userDataByUserService";
import { useGetUserExperienceByUserQuery } from "@/service/userExperienceByUserService";
import { SkillsSettingsScreen } from "@/components/screens/skillsSettings";
import { AuthWrapper } from "@/components/layout/authWrapper";


const Resume = () => {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    const profileRef = useRef<any>(null);
    const experienceRef = useRef<any>(null);

    const { data: profile } = useGetUserDataByUserQuery();
    const { data: experience } = useGetUserExperienceByUserQuery();


    useEffect(() => {
        if(profile && profile.length > 0) {
            setActiveStep(prev => prev = 1)
        }
        if (experience && experience.length > 0) {
            setActiveStep(prev => prev = 2)
        }
    }, [profile, experience])

    const handleNext = () => {
        if(activeStep === 0) {
            profileRef.current.click()
        }
        if(activeStep === 1) {
            experienceRef.current.click()
        }
        setActiveStep((cur) => cur + 1)
    };
    const handlePrev = () => setActiveStep((cur) => cur - 1);

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
                        {activeStep === 1 && <ExperienceSettingsScreen submitRef={experienceRef} />}
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