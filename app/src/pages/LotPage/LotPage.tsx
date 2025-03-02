import { useNavigate, useParams } from 'react-router'
import { useGetLotDetails } from '@/utils/hooks/lots/useGetLotDetails'
import { Flex, notification, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import lotLogo from '@/assets/gavel.svg'
import mapPinLogo from '@/assets/map-pin.svg'
import fuelLogo from '@/assets/fuel.svg'
import { z } from 'zod'
import { isDefined } from '@/utils/is-defined'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { CreateLot } from '@/api/lot/lot'
import { routes } from '@/router/routes'

import * as S from '@/pages/LotPage/LotPage.styled'

const createLotSchema = z.object({
  lot_id: z.number().refine(isDefined, 'Обязательное поле'),
  nb_name: z.string().refine(isDefined, 'Обязательное поле'),
  nb_region: z.string().refine(isDefined, 'Обязательное поле'),
  fuel_type: z.string().refine(isDefined, 'Обязательное поле'),
  volume: z.string().nullable().refine(isDefined, 'Обязательное поле'),
  delivery_type: z.string().refine(isDefined, 'Обязательное поле'),
  delivery_address: z.string().nullable(),
})

export type CreateLotFormData = z.infer<typeof createLotSchema>
export type CreateLotFormDataChanged = Omit<
  z.infer<typeof createLotSchema>,
  'volume'
> & { volume: number }

export function LotPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: lotData, isLoading, isFetching } = useGetLotDetails(id)

  const { control, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(createLotSchema),
    defaultValues: {
      lot_id: lotData?.id,
      nb_name: lotData?.nb_name,
      nb_region: lotData?.nb_region,
      fuel_type: lotData?.fuel_type,
      volume: null,
      delivery_type: 'pickup',
      delivery_address: null,
    },
  })

  const volumeWatch = watch('volume')
  const deliveryTypeWatch = watch('delivery_type')

  function changeDeliveryType(newType: string) {
    setValue('delivery_type', newType)
  }

  useEffect(() => {
    if (lotData) {
      setValue('lot_id', lotData.id)
      setValue('nb_name', lotData.nb_name)
      setValue('nb_region', lotData.nb_region)
      setValue('fuel_type', lotData.fuel_type)
    }
  }, [lotData])

  async function onSubmit(data: CreateLotFormData) {
    const newData: CreateLotFormDataChanged = {
      ...data,
      volume: Number(data.volume),
    }
    try {
      const res = await CreateLot(newData)

      if (res) {
        notification.success({
          message: 'Заказ успешно оформлен',
        })
        navigate(routes.main.url)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading || isFetching) {
    return (
      <Flex
        align='center'
        justify='center'
        style={{ width: '100%', height: 300 }}
      >
        <Spin indicator={<LoadingOutlined spin />} size='large' />
      </Flex>
    )
  }

  return (
    <Flex
      vertical
      component='form'
      gap={32}
      style={{ marginBottom: 64 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex vertical gap={24}>
        <Flex gap={16}>
          <Flex align='center' vertical gap={8}>
            <S.Dot>
              <span>1</span>
            </S.Dot>
            <S.Vertical />
          </Flex>
          <Flex vertical gap={16}>
            <S.SectionTitle>Подробности заказа</S.SectionTitle>
            <S.ContentWrapper vertical gap={12}>
              <S.TitleText>{lotData?.fuel_type}</S.TitleText>
              <Flex vertical gap={8}>
                <Flex gap={8}>
                  <img src={lotLogo} alt='gavel' />
                  <S.Text>№ {lotData?.id}</S.Text>
                </Flex>
                <Flex gap={8}>
                  <img src={mapPinLogo} alt='gavel' />
                  <S.Text>{lotData?.nb_region}</S.Text>
                </Flex>
                <Flex gap={8}>
                  <img src={fuelLogo} alt='gavel' />
                  <S.Text>{lotData?.nb_name}</S.Text>
                </Flex>
                <Flex gap={8}>
                  <S.Text>Остаток:</S.Text>
                  <S.Text>{lotData?.available_volume} тонн</S.Text>
                </Flex>
                <Flex gap={8}>
                  <S.Text>Цена за тонну:</S.Text>
                  <S.Text>{lotData?.price_per_ton} ₽</S.Text>
                </Flex>
              </Flex>
            </S.ContentWrapper>
          </Flex>
        </Flex>
        <Flex gap={16}>
          <Flex align='center' vertical gap={8}>
            <S.Dot>
              <span>2</span>
            </S.Dot>
            <S.Vertical />
          </Flex>
          <Flex vertical gap={16}>
            <S.SectionTitle>Расчет стоимости (в литрах)</S.SectionTitle>
            <Flex vertical gap={12}>
              <Flex vertical gap={4}>
                <S.Text>Тонн требуется:</S.Text>
                <Controller
                  control={control}
                  name='volume'
                  render={({ field }) => (
                    <S.VolumeInput
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder='100'
                    />
                  )}
                />
              </Flex>
              <Flex vertical gap={4}>
                <S.Text>Итого:</S.Text>
                <S.VolumeInput
                  value={
                    volumeWatch && lotData?.price_per_ton
                      ? `${(
                          Number(volumeWatch) * lotData.price_per_ton
                        ).toFixed(0)} ₽`
                      : ''
                  }
                  readOnly
                  placeholder='Сумма в ₽'
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap={16}>
          <Flex align='center' vertical gap={8}>
            <S.Dot>
              <span>3</span>
            </S.Dot>
            <S.Vertical />
          </Flex>
          <Flex vertical gap={16}>
            <S.SectionTitle>Выберите способ получения</S.SectionTitle>
            <Flex gap={12}>
              <S.DeliveryTab
                isSelected={deliveryTypeWatch === 'pickup'}
                onClick={() => changeDeliveryType('pickup')}
              >
                <S.DeliveryTabText>Самовывоз</S.DeliveryTabText>
              </S.DeliveryTab>
              <S.DeliveryTab
                isSelected={deliveryTypeWatch === 'delivery'}
                onClick={() => changeDeliveryType('delivery')}
              >
                <S.DeliveryTabText>Доставка</S.DeliveryTabText>
              </S.DeliveryTab>
            </Flex>
            <S.DeliveryWrapper vertical gap={12}>
              {deliveryTypeWatch === 'pickup' ? (
                <Flex vertical gap={2}>
                  <S.TitleText>{lotData?.nb_name}</S.TitleText>
                  <S.Text>Ежедневно с 9:00 до 22:00</S.Text>
                </Flex>
              ) : (
                <Flex vertical gap={12}>
                  <S.TitleText>Введите адрес</S.TitleText>
                  <Controller
                    control={control}
                    name='delivery_address'
                    render={({ field }) => (
                      <S.AddressInput
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder='Москва, Ленинский пр-кт, дом 52'
                      />
                    )}
                  />
                </Flex>
              )}
            </S.DeliveryWrapper>
          </Flex>
        </Flex>
      </Flex>
      <S.SubmitButton htmlType='submit'>Оформить заказ</S.SubmitButton>
    </Flex>
  )
}
