import { z } from 'zod'
import { isDefined } from '@/utils/is-defined'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { InputField } from '@/components/form/InputField'
import { Link } from 'react-router'
import { routes } from '@/router/routes'

import * as S from '@/pages/auth/AuthPage.styled'

const loginSchema = z.object({
  username: z.string().refine(isDefined, 'Обязательное поле'),
  email: z.string().refine(isDefined, 'Обязательное поле'),
  password: z.string().refine(isDefined, 'Обязательное поле'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function RegisterPage() {
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

  function onSubmit(data: LoginFormData) {
    console.log({ data })
  }

  return (
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
              <InputField {...field} placeholder='Email' error={errors.email} />
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
  )
}
