import { useNavigate, useParams } from 'react-router'
import { useGetLotDetails } from '@/utils/hooks/lots/useGetLotDetails'
import { Button, Flex, Input, notification } from 'antd'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import lotLogo from '@/assets/gavel.svg'
import mapPinLogo from '@/assets/map-pin.svg'
import fuelLogo from '@/assets/fuel.svg'
import { z } from 'zod'
import { isDefined } from '@/utils/is-defined'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { CreateLot } from '@/api/lot/lot'
import { useCookies } from 'react-cookie'
import { routes } from '@/router/routes'

const Dot = styled.div`
  margin-top: 4.5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  border-radius: 999px;

  span {
    color: ${colors.primaryGray};
    font-weight: 600;
    font-size: 14px;
    line-height: 19.12px;
  }
`

const Vertical = styled.div`
  width: 1px;
  height: 100%;
  background: #d3d3d3;
`

const ContentWrapper = styled(Flex)`
  width: 301px;
  background: ${colors.white};
  border-radius: 6px;
  padding: 16px 32px 32px;
`

const DeliveryWrapper = styled(Flex)`
  width: 400px;
  background: ${colors.white};
  border-radius: 6px;
  padding: 16px 32px;
`

const SectionTitle = styled.p`
  color: ${colors.primaryBlack};
  font-weight: 500;
  font-size: 24px;
  line-height: 32.78px;
`

const TitleText = styled.p`
  color: ${colors.primaryBlack};
  font-weight: 500;
  font-size: 20px;
  line-height: 32.78px;
  line-height: 27.32px;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 21.86px;
`

const VolumeInput = styled(Input)`
  width: 164px;
  height: 44px;
`

interface DeliveryTabProps {
  isSelected: boolean
}

const DeliveryTab = styled.div<DeliveryTabProps>`
  width: fit-content;
  background: ${colors.white};
  border-radius: 6px;
  padding: 6px 16px;
  cursor: pointer;
  background-color: ${props => (props.isSelected ? colors.white : '#F1F1F1')};
`

const DeliveryTabText = styled.p`
  color: #000000b2;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
`

const SubmitButton = styled(Button)`
  width: fit-content;
  height: 31px;
`

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
  const [cookies] = useCookies(['token'])
  const token = cookies.token
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
      const res = await CreateLot(token, newData)

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
    return null
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
            <Dot>
              <span>1</span>
            </Dot>
            <Vertical />
          </Flex>
          <Flex vertical gap={16}>
            <SectionTitle>Подробности заказа</SectionTitle>
            <ContentWrapper vertical gap={12}>
              <TitleText>{lotData?.fuel_type}</TitleText>
              <Flex vertical gap={8}>
                <Flex gap={8}>
                  <img src={lotLogo} alt='gavel' />
                  <Text>№ {lotData?.id}</Text>
                </Flex>
                <Flex gap={8}>
                  <img src={mapPinLogo} alt='gavel' />
                  <Text>{lotData?.nb_region}</Text>
                </Flex>
                <Flex gap={8}>
                  <img src={fuelLogo} alt='gavel' />
                  <Text>{lotData?.nb_name}</Text>
                </Flex>
                <Flex gap={8}>
                  <Text>Остаток:</Text>
                  <Text>{lotData?.available_volume} тонн</Text>
                </Flex>
                <Flex gap={8}>
                  <Text>Цена за тонну:</Text>
                  <Text>{lotData?.price_per_ton} ₽</Text>
                </Flex>
              </Flex>
            </ContentWrapper>
          </Flex>
        </Flex>
        <Flex gap={16}>
          <Flex align='center' vertical gap={8}>
            <Dot>
              <span>2</span>
            </Dot>
            <Vertical />
          </Flex>
          <Flex vertical gap={16}>
            <SectionTitle>Расчет стоимости (в литрах)</SectionTitle>
            <Flex vertical gap={12}>
              <Flex vertical gap={4}>
                <Text>Тонн требуется:</Text>
                <Controller
                  control={control}
                  name='volume'
                  render={({ field }) => (
                    <VolumeInput
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder='100'
                    />
                  )}
                />
              </Flex>
              <Flex vertical gap={4}>
                <Text>Итого:</Text>
                <VolumeInput
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
            <Dot>
              <span>3</span>
            </Dot>
            <Vertical />
          </Flex>
          <Flex vertical gap={16}>
            <SectionTitle>Выберите способ получения</SectionTitle>
            <Flex gap={12}>
              <DeliveryTab
                isSelected={deliveryTypeWatch === 'pickup'}
                onClick={() => changeDeliveryType('pickup')}
              >
                <DeliveryTabText>Самовывоз</DeliveryTabText>
              </DeliveryTab>
              <DeliveryTab
                isSelected={deliveryTypeWatch === 'delivery'}
                onClick={() => changeDeliveryType('delivery')}
              >
                <DeliveryTabText>Доставка</DeliveryTabText>
              </DeliveryTab>
            </Flex>
            <DeliveryWrapper vertical gap={12}>
              {deliveryTypeWatch === 'pickup' ? (
                <Flex vertical gap={2}>
                  <TitleText>{lotData?.nb_name}</TitleText>
                  <Text>Ежедневно с 9:00 до 22:00</Text>
                </Flex>
              ) : (
                <Flex vertical gap={12}>
                  <TitleText>Введите адрес</TitleText>
                  <Controller
                    control={control}
                    name='delivery_address'
                    render={({ field }) => (
                      <Input
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder='Москва, Ленинский пр-кт, дом 52'
                      />
                    )}
                  />
                </Flex>
              )}
            </DeliveryWrapper>
          </Flex>
        </Flex>
      </Flex>
      <SubmitButton htmlType='submit'>Оформить заказ</SubmitButton>
    </Flex>
  )
}
