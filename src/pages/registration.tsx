import { FormConstructor } from "@/components/formConstructor"
import HeadLayout from "@/components/layout/headLayout"
import { authSignUpForm } from "@/forms/authForm"
import { useRegUserMutation } from "@/service/projectService"
import { useAppDispatch } from "@/store/hooks"
import { setCredentials, setUser } from "@/store/slice/authSlice"
import { ISignUpType, SignUpSchema } from "@/utils/yupSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, Checkbox, Typography } from "@material-tailwind/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"


const Registration = () => {
  // регистрация формы
  const { register, handleSubmit, formState: { errors } } = useForm<ISignUpType>({
    resolver: yupResolver(SignUpSchema),
  });

  const [registerUser, { isLoading }] = useRegUserMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  const registrationUser: SubmitHandler<ISignUpType> = (data) => {
    toast.promise(
      registerUser(data).unwrap(),
      {
        loading: 'Регистрация...',
        success: (data) => `Регистрация прошла успешно ${data?.email}! Авторизуйтесь для входа в аккаунт.`,
        error: (err) => `Произошла ошибка (${err?.data})`
      }
    ).then((res) => {
      dispatch(setUser({me: res}));
      localStorage.setItem('token', res.data);
      // dispatch(setCredentials(res.data));
      router.push('/login')
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Регистрация
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Введите свои данные для регистрации.
      </Typography>
      <FormConstructor
        fieldList={authSignUpForm}
        onSubmit={handleSubmit(data => registrationUser(data))}
        register={register}
        formClassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        inputClassName="mb-1 flex flex-col gap-6"
        errors={errors}>
        <Checkbox
          {...register('termsAccepted', { required: true })}
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              Я соглашаюсь с&nbsp;
              <Link
                href="/privacy-policy"
                className="font-medium transition-colors text-blue-600 hover:underline"
              >
                пользовательским соглашением
              </Link>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        {errors && errors.termsAccepted &&
          <Typography variant="small" color="red" className="-mb-3">
            {errors.termsAccepted?.message}
          </Typography>
        }
        <Button className="mt-6" fullWidth loading={isLoading} type="submit">
          Регистрация
        </Button>
      </FormConstructor>

      <Typography color="gray" className="mt-4 text-center font-normal">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-blue-600">
          Войти
        </Link>
      </Typography>
    </Card>
  )
}

Registration.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeadLayout title="Регистарция" description="Регистарция" keywords="Регистарция">
      {page}
    </HeadLayout>
  )
}

export default Registration;