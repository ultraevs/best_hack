import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

interface ILotsFilters {
  nb_name: string[]
  nb_region: string[]
  fuel_type: string[]
}

export function useGetLotsFilters() {
  const fetchData = async (): Promise<ILotsFilters | null> => {
    try {
      const res = await instance({
        url: 'lot-filters',
        method: 'GET',
      })

      return res.data
    } catch (error) {
      console.error('Error during getting lots filters:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchLotsFilters'],
    queryFn: fetchData,
  })
}
