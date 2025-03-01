import instance from '@/api/axiosInstance'
import { LoginFormData } from '@/pages/auth/LoginPage/LoginPage'
import { RegisterFormData } from '@/pages/auth/RegisterPage/RegisterPage'

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
  }
}
