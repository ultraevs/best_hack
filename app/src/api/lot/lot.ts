import instance from '@/api/axiosInstance'
import { CreateLotFormDataChanged } from '@/pages/LotPage/LotPage'
import { notification } from 'antd'

export const CreateLot = async (
  data: CreateLotFormDataChanged,
) => {
  try {
    const res = await instance({
      url: 'orders',
      method: 'POST',
      data: {
        ...data,
      },
    })

    return res.data
  } catch (error) {
    console.error('Error during upon registration order:', error)
    notification.error({
      message: 'Ошибка при оформлении заказа',
    })
  }
}
