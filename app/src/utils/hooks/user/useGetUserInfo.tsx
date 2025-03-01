import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

export interface IUserInfo {
  username: string
  id: number
  email: string
}

export function useGetUserInfo() {
  const [cookies] = useCookies(['token'])
  const token = cookies.token

  const fetchData = async (): Promise<IUserInfo | null> => {
    if (!token) {
      throw new Error('Token is required')
    }

    try {
      const res = await instance({
        url: 'user/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.data
    } catch (error) {
      console.error('Error during getting user info:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchUserInfo', token],
    queryFn: fetchData,
  })
}
