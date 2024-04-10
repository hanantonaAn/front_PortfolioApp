import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { MenuProfile } from "@/components/menuProfile";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, Card, Typography } from "@material-tailwind/react";
import { ExperienceSettingsScreen } from "@/components/screens/experienceSettings";


const Experience = () => {
  return (
    <Wrapper>
      <div className="flex gap-5 py-12">
        <MenuProfile />
        <div className="w-full md:w-3/4">
          <Card className="p-6 w-1/2">
            <Typography variant="h6" color="light-blue">
              Основная информация
            </Typography>
            <ExperienceSettingsScreen>
              <Button type="submit" color="light-blue" className="mt-5">
                Сохранить
              </Button>
            </ExperienceSettingsScreen>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}

Experience.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Опыт" description="Опыт" keywords="Опыт">
      <PageLayout>{page}</PageLayout>
    </HeadLayout>
  )
}

export default Experience;