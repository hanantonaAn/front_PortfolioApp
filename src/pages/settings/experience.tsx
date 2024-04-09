import PageLayout from "@/components/layout/pageLayout";
import { ReactElement, useEffect, useState } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { MenuProfile } from "@/components/menuProfile";
import { Wrapper } from "@/components/layout/wrapper";
import { Card, Typography, Button } from "@material-tailwind/react";
import { FormConstructor } from "@/components/formConstructor";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExperienceSchema, IExperienceType } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup"
import { IFormTagsKey } from "@/types/form";
import { experienceForm } from "@/forms/experienceForm";
import { useCreateUserExperienceByUserMutation, useGetUserExperienceByUserQuery, useUpdateUserExperienceByUserMutation } from "@/service/userExperienceByUserService";


const Experience = () => {

  const { data: experience } = useGetUserExperienceByUserQuery();

  const { register, control, reset, handleSubmit, formState: { errors } } = useForm<IExperienceType>({
    resolver: yupResolver(ExperienceSchema),
  });

  const [tags, setTags] = useState<IFormTagsKey>({ experience: [] });

  useEffect(() => {
    if (experience && experience.length > 0) {
      reset({
        ...experience[0],
        experience: ''
      })
      setTags((prev) => ({
        ...prev,
        experience: experience[0].experience
      }))
    }
  }, [experience])

  const [createExperience] = useCreateUserExperienceByUserMutation();
  const [updateProfile] = useUpdateUserExperienceByUserMutation();

  const submitForm: SubmitHandler<IExperienceType> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "picture") {
        formData.append(key, value);
      } else if (["experience"].includes(key)) {
        formData.append(key, JSON.stringify(tags[key as keyof typeof tags]));
      } else if (value) {
        formData.append(key, value);
      }
    });
    if (experience && experience.length > 0) {
      updateProfile({ id: experience[0].id, data: formData }).unwrap()
    } else {
      createExperience(formData).unwrap()
    }
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
            <FormConstructor fieldList={experienceForm}
              onSubmit={handleSubmit(data => submitForm(data))}
              register={register}
              inputClassName="grid grid-cols-1 gap-4"
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

Experience.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Опыт" description="Опыт" keywords="Опыт">
      <PageLayout>{page}</PageLayout>
    </HeadLayout>
  )
}

export default Experience;