import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

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
  const fetchData = async (): Promise<IOrder[] | null> => {
    try {
      const res = await instance({
        url: 'user/orders',
        method: 'GET',
      })

      return res.data
    } catch (error) {
      console.error('Error during getting user orders:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchUserOrders'],
    queryFn: fetchData,
  })
}
