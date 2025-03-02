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

type IQueryItem = string | null

export interface IFilters {
  search_query: IQueryItem
  nb_region: IQueryItem
  fuel_type: IQueryItem
  min_available_volume: IQueryItem
  min_price: IQueryItem
  max_price: IQueryItem
}

function generateQueryString(filters: IFilters): string {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === '') return

    if (key === 'nb_region') {
      value
        ?.split(',')
        .filter((region: string) => region.trim() !== '')
        .forEach((region: string) => params.append('nb_region', region.trim()))
    } else if (key === 'fuel_type') {
      value
        ?.split(',')
        .filter((region: string) => region.trim() !== '')
        .forEach((region: string) => params.append('fuel_type', region.trim()))
    } else {
      params.append(key, value.toString())
    }
  })

  return params.toString()
}

export function useGetLots(filters: IFilters) {
  const queryString = generateQueryString(filters)

  const fetchData = async (): Promise<ILot[] | null> => {
    try {
      const res = await instance({
        url: 'lots?' + queryString,
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
