import { z } from 'zod'
import { isDefined } from '@/utils/is-defined'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, notification } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { InputField } from '@/components/form/InputField'
import { Link, useNavigate } from 'react-router'
import { routes } from '@/router/routes'
import { RegisterUser } from '@/api/auth/auth'
import { jwtDecode } from 'jwt-decode'
import { UserType, useUser } from '@/helpers/user/UserProvider'
import { useCookies } from 'react-cookie'

import * as S from '@/pages/auth/AuthPage.styled'

const loginSchema = z.object({
  username: z.string().refine(isDefined, 'Обязательное поле'),
  email: z.string().refine(isDefined, 'Обязательное поле'),
  password: z.string().refine(isDefined, 'Обязательное поле'),
})

export type RegisterFormData = z.infer<typeof loginSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const [_cookies, setCookie] = useCookies(['token'])
  const { setUser } = useUser()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: RegisterFormData) {
    try {
      const res = await RegisterUser(data)

      const token = res.access_token
      setCookie('token', token, { path: '/', expires: token.exp })

      const user = jwtDecode(token)
      setUser(user as UserType)

      if (user) {
        notification.success({
          message: 'Вы успешно зарегистрировались',
        })
        navigate(routes.main.url)
      }
    } catch (error) {
      notification.error({
        message: 'Ошибка при регистрации',
      })
    }
  }

  return (
    <S.Content>
      <S.Wrapper>
        <Flex
          vertical
          component='form'
          gap={32}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Flex vertical gap={12}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Имя пользователя'
                  error={errors.username}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Email'
                  error={errors.email}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Пароль'
                  error={errors.password}
                />
              )}
            />
          </Flex>
          <S.StyledButton htmlType='submit'>Зарегистрироваться</S.StyledButton>
          <S.TextWrapper>
            Нет аккаунта? &nbsp;
            <Link to={routes.login.url}>Войти</Link>
          </S.TextWrapper>
        </Flex>
      </S.Wrapper>
    </S.Content>
  )
}
