import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { MenuProfile } from "@/components/menuProfile";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, Card, Typography } from "@material-tailwind/react";
import { ExperienceSettingsScreen } from "@/components/screens/experienceSettings";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { useCreateUserExperienceByUserMutation } from "@/service/userExperienceByUserService";
import { IExperience } from "@/types/experience";
import toast from "react-hot-toast";


const Experience = () => {
  const [createExperience] = useCreateUserExperienceByUserMutation();

  const submitForm = () => {
    const Data: Partial<IExperience> = {
      experience_info: '',
      experience_years: 'noExperience',
      position: '',
      company: ''
    }
    toast.promise(
      createExperience(Data).unwrap(),
      {
        loading: 'Сохранение...',
        success: () => `Опыт успешно создан`,
        error: () => `Произошла ошибка`
      }
    )
  };
  return (
    <AuthWrapper>
      <PageLayout>
        <Wrapper>
          <div className="flex gap-5 py-12">
            <MenuProfile />
            <div className="w-full md:w-3/4 grid grid-cols-1 gap-5">
              <ExperienceSettingsScreen>
                <Button type="submit" color="light-blue" className="mt-5">
                  Сохранить
                </Button>
              </ExperienceSettingsScreen>
              <div>
                <Button onClick={submitForm} color="blue">Добавить ещё опыт</Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </PageLayout>
    </AuthWrapper>
  );
}

Experience.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Опыт" description="Опыт" keywords="Опыт">
      {page}
    </HeadLayout>
  )
}

export default Experience;