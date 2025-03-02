import { z } from 'zod'
import { isDefined } from '@/utils/is-defined'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, notification } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { InputField } from '@/components/form/InputField'
import { Link, useNavigate } from 'react-router'
import { routes } from '@/router/routes'
import { LoginUser } from '@/api/auth/auth'
import { jwtDecode } from 'jwt-decode'
import { UserType, useUser } from '@/helpers/user/UserProvider'
import Cookies from 'js-cookie';

import * as S from '@/pages/Auth/AuthPage.styled'

const loginSchema = z.object({
  username: z.string().refine(isDefined, 'Обязательное поле'),
  password: z.string().refine(isDefined, 'Обязательное поле'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useUser()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormData) {
    try {
      const res = await LoginUser(data)

      const token = res.access_token
      Cookies.set('token', token, { path: '/', expires: token.exp })

      const user = jwtDecode(token)
      setUser(user as UserType)

      if (user) {
        notification.success({
          message: 'Вы успешно вошли в систему'
        })
        navigate(routes.main.url)
      }
    } catch (error) {
      console.error(error)
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
              name='password'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Пароль'
                  error={errors.password}
                  type='password'
                />
              )}
            />
          </Flex>
          <S.StyledButton htmlType='submit'>Войти</S.StyledButton>
          <S.TextWrapper>
            Нет аккаунта? &nbsp;
            <Link to={routes.register.url}>Зарегистрироваться</Link>
          </S.TextWrapper>
        </Flex>
      </S.Wrapper>
    </S.Content>
  )
}
