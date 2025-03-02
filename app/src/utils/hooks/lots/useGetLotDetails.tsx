import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { ILot } from '@/utils/hooks/lots/useGetLots'

export function useGetLotDetails(id: string | undefined) {
  if (!id) {
    throw new Error('id is required')
  }

  const fetchData = async (): Promise<ILot | null> => {
    try {
      const res = await instance({
        url: `lots/${+id}`,
        method: 'GET',
      })

      return res.data
    } catch (error) {
      console.error('Error during getting lots:', error)
      return null
    }
  }

  return useQuery({
    queryKey: ['fetchLotDetail'],
    queryFn: fetchData,
  })
}
