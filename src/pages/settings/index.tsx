import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { MenuProfile } from "@/components/menuProfile";
import { Wrapper } from "@/components/layout/wrapper";
import { Button, Card, Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";
import { ProfileSettingsScreen } from "@/components/screens/settingsScreen/profileSettings";

const Settings = () => {
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
                <ProfileSettingsScreen>
                  <Button type="submit" color="light-blue" className="mt-5">
                    Сохранить
                  </Button>
                </ProfileSettingsScreen>
              </Card>
            </div>
          </div>
        </Wrapper>
      </PageLayout>
    </AuthWrapper>
  );
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Профиль" description="Профиль" keywords="Профиль">
      {page}
    </HeadLayout>
  )
}

export default Settings;