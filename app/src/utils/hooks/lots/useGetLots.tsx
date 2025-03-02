import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export interface ILot {
  date: string
  fuel_type: string
  nb_name: string
  nb_region: string
  start_weight: number
  available_volume: number
  status: string
  lot_price: number
  price_per_ton: number
  id: number
}

export function useGetLots() {
  const fetchData = async (): Promise<ILot[] | null> => {
    try {
      const res = await instance({
        url: 'lots',
        method: 'GET',
      })

      return res.data
    } catch (error) {
      console.error('Error during getting lots:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchLots'],
    queryFn: fetchData,
  })
}
