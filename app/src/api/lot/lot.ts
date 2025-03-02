import instance from '@/api/axiosInstance'
import { CreateLotFormDataChanged } from '@/pages/LotPage/LotPage'

export const CreateLot = async (token: string, data: CreateLotFormDataChanged) => {
  try {
    const res = await instance({
      url: 'orders',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...data,
      },
    })

    return res.data
  } catch (error) {
    console.error('Error during login:', error)
  }
}
