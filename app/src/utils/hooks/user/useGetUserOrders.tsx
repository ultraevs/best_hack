import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

export interface IOrder {
  order_date: string
  lot_id: number
  nb_name: string
  nb_region: string
  fuel_type: string
  volume: number
  delivery_type: string
  delivery_address: string
  client_id: number
  id: number
}

export function useGetUserOrders() {
  const [cookies] = useCookies(['token'])
  const token = cookies.token

  const fetchData = async (): Promise<IOrder[] | null> => {
    if (!token) {
      throw new Error('Token is required')
    }

    try {
      const res = await instance({
        url: 'user/orders',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.data
    } catch (error) {
      console.error('Error during getting user orders:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchUserOrders', token],
    queryFn: fetchData,
  })
}
