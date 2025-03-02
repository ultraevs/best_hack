import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export interface IUserInfo {
  username: string
  id: number
  email: string
}

export function useGetUserInfo() {
  const fetchData = async (): Promise<IUserInfo | null> => {
    try {
      const res = await instance({
        url: 'user/me',
        method: 'GET',
      })

      return res.data
    } catch (error) {
      console.error('Error during getting user info:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchUserInfo'],
    queryFn: fetchData,
  })
}
