import { FormConstructor } from "@/components/formConstructor"
import { authLoginForm } from "@/forms/authForm"
import { useLoginUserMutation } from "@/service/projectService"
import { useGetUserSkillsByUserQuery } from "@/service/usersSkillByUserService"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setCredentials } from "@/store/slice/authSlice"
import { ISignInType, SignInSchema } from "@/utils/yupSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Card, Typography } from "@material-tailwind/react"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"


const Login: NextPage = () => {

  // регистрация формы
  const { register, handleSubmit, formState: { errors } } = useForm<ISignInType>({
    resolver: yupResolver(SignInSchema),
  });

  const { data: skills } = useGetUserSkillsByUserQuery()

  const username = useAppSelector(state => state.auth.username);

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginAuthUser: SubmitHandler<ISignInType> = (data) => {
    toast.promise(
      loginUser(data).unwrap(),
      {
        loading: 'Вход в систему...',
        success: () => `Вход прошел успешно`,
        error: () => `Произошла ошибка`
      }
    ).then((res) => {
      localStorage.setItem('token', res.access);
      dispatch(setCredentials(res));
      if(skills && skills.length > 0) {
        router.push(`/profile/${username}`)
      } else if(username) {
        router.push('/resume');
      } else {
        router.push('/')
      }
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Войти
      </Typography>
      <FormConstructor
        fieldList={authLoginForm}
        onSubmit={handleSubmit(data => loginAuthUser(data))}
        register={register}
        formClassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        inputClassName="mb-1 flex flex-col gap-6"
        errors={errors}>
        <Button className="mt-6" fullWidth loading={isLoading} type="submit">
          Войти
        </Button>
      </FormConstructor>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Ещё нет аккаунта?{" "}
        <Link href="/registration" className="font-medium text-blue-600">
          Регистрация
        </Link>
      </Typography>
    </Card>
  )
}

export default Login
