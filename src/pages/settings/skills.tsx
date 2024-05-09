import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { MenuProfile } from "@/components/menuProfile";
import { Wrapper } from "@/components/layout/wrapper";
import { Card, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { SkillsSettingsScreen } from "@/components/screens/settingsScreen/skillsSettings";


const Experience = () => {
  return (
    <AuthWrapper>
      <PageLayout>
        <Wrapper>
          <div className="flex gap-5 py-12">
            <MenuProfile />
            <div className="w-full md:w-3/4">
              <Card className="p-6 w-1/2">
                <Typography variant="h6" color="light-blue">
                  Основная информация
                </Typography>
                <SkillsSettingsScreen />
              </Card>
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