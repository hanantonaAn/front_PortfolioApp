import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { MenuProfile } from "@/components/menuProfile";
import { Wrapper } from "@/components/layout/wrapper";
import { Card, CardHeader, Typography, CardBody, Avatar, Button, CardFooter, Input } from "@material-tailwind/react";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProfileType, ProfileSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { profileForm } from "@/forms/profileForm";
import { useCreateUserDataMutation } from "@/service/userDataService";


const Settings = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IProfileType>({
    resolver: yupResolver(ProfileSchema),
  });

  const [updateProfile] = useCreateUserDataMutation()

  const test: SubmitHandler<IProfileType> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "picture") {
        data.picture && formData.append(key, data.picture)
      } else {
        formData.append(key, (data as any)[key])
      }
    }
    updateProfile(formData).unwrap()
  };
  return (
    <Wrapper>
      <div className="flex gap-5 py-12">
        <MenuProfile />
        <div className="w-full md:w-3/4">
          <Card className="p-6 w-1/2">
            <Typography variant="h6" color="light-blue">
              Основная информация
            </Typography>
            <FormConstructor fieldList={profileForm}
              onSubmit={handleSubmit(data => test(data))}
              register={register}
              inputClassName="grid grid-cols-1 gap-2"
              control={control}
              errors={errors}>
              {
                ['1', '2'] &&
                <div className="flex flex-wrap gap-2 mt-6">
                  {['1', '2'].map((item, id) => {
                    return (
                      <div className="flex gap-4 rounded-2xl bg-blue-500 text-white px-3 py-2" key={id}>
                        #{item}
                        <span className="text-red-500 cursor-pointer hover:text-red-500/50 transition-all duration-150">x</span>
                      </div>
                    )
                  })}
                </div>
              }
              <Button type="submit" color="light-blue" className="mt-5">
                Сохранить
              </Button>
            </FormConstructor>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Профиль" description="Профиль" keywords="Профиль">
      <PageLayout>{page}</PageLayout>
    </HeadLayout>
  )
}

export default Settings;