import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

export function useGetCancelOrder(id: string | undefined) {
  const [cookies] = useCookies(['token'])
  const token = cookies.token

  if (!id) {
    throw new Error('id is required')
  }

  const fetchData = async (): Promise<boolean | null> => {
    if (!token) {
      throw new Error('Token is required')
    }

    try {
      const res = await instance({
        url: 'orders/2',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          order_id: +id,
        },
      })

      return res.data
    } catch (error) {
      console.error('Error during cancelling user order:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchCancelUserOrder', token],
    queryFn: fetchData,
  })
}
