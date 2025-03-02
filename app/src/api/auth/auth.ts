import instance from '@/api/axiosInstance'
import { LoginFormData } from '@/pages/Auth/LoginPage/LoginPage'
import { RegisterFormData } from '@/pages/Auth/RegisterPage/RegisterPage'
import { notification } from 'antd'

export const LoginUser = async (data: LoginFormData) => {
  try {
    const res = await instance({
      url: 'token',
      method: 'POST',
      data: {
        ...data,
      },
    })

    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    notification.error({
      message: 'Ошибка при логине',
    })
  }
}

export const RegisterUser = async (data: RegisterFormData) => {
  try {
    const res = await instance({
      url: 'register',
      method: 'POST',
      data: {
        ...data,
      },
    })

    return res.data
  } catch (error) {
    console.error('Error during register:', error)
    notification.error({
      message: 'Ошибка при регистрации',
    })
  }
}
