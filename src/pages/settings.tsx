import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useState } from "react";
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
import { IFormTagsKey } from "@/types/form";


const Settings = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IProfileType>({
    resolver: yupResolver(ProfileSchema),
  });

  const [tags, setTags] = useState<IFormTagsKey>({ languages: [], curses: [] });

  const [updateProfile] = useCreateUserDataMutation()

  const test: SubmitHandler<IProfileType> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "picture") {
        formData.append(key, value);
      } else if (["languages", "curses"].includes(key)) {
        formData.append(key, JSON.stringify(tags[key as keyof typeof tags]));
      } else if (value) {
        formData.append(key, value);
      }
    });
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
              tags={tags}
              setTags={setTags}
              errors={errors}>
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