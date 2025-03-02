import instance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export function useGetCancelOrder(id: string | undefined) {
  if (!id) {
    throw new Error('id is required')
  }

  const fetchData = async (): Promise<boolean | null> => {

    try {
      const res = await instance({
        url: 'orders/2',
        method: 'DELETE',
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
    queryKey: ['fetchCancelUserOrder', id],
    queryFn: fetchData,
  })
}
