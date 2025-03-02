import { ILot } from '@/utils/hooks/lots/useGetLots'
import { Button, Flex } from 'antd'
import lotLogo from '@/assets/gavel.svg'
import mapPinLogo from '@/assets/map-pin.svg'
import fuelLogo from '@/assets/fuel.svg'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { useNavigate } from 'react-router'
import { routes } from '@/router/routes'

const Wrapper = styled(Flex)`
  width: 100%;
  background: ${colors.white};
  border-radius: 6px;
`

const TitleWrapper = styled(Flex)`
  padding: 14px 24px;
  border-bottom: 1px solid #ebebeb;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 21.86px;
`

const ContentWrapper = styled(Flex)`
  padding: 14px 24px;
`

const TitleText = styled.p`
  color: ${colors.primaryBlack};
  font-weight: 500;
  font-size: 24px;
  line-height: 32.78px;
`

const TextContent = styled.p`
  color: #000000b2;
  font-weight: 400;
  font-size: 16px;
  line-height: 21.86px;
`

const ActionWrapper = styled(Flex)`
  padding: 14px 24px;
  border-top: 1px solid #ebebeb;
`

interface LotCardProps {
  lotData: ILot
}

export function LotCard({ lotData }: LotCardProps) {
  const navigate = useNavigate()

  return (
    <Wrapper vertical>
      <TitleWrapper align='center' gap={24}>
        <Flex gap={8}>
          <img src={lotLogo} alt='gavel' />
          <Text>№ {lotData.id}</Text>
        </Flex>
        <Flex gap={8}>
          <img src={mapPinLogo} alt='gavel' />
          <Text>{lotData.nb_region}</Text>
        </Flex>
        <Flex gap={8}>
          <img src={fuelLogo} alt='gavel' />
          <Text>{lotData.nb_name}</Text>
        </Flex>
      </TitleWrapper>
      <ContentWrapper>
        <Flex flex={1} justify='space-between'>
          <Flex vertical gap={37}>
            <TitleText>{lotData.fuel_type}</TitleText>
            <Flex vertical gap={4}>
              <TextContent>
                Остаток: {lotData.available_volume} тонн
              </TextContent>
              <TextContent>Заканчивается: {lotData.date}</TextContent>
            </Flex>
          </Flex>

          <Flex vertical gap={4}>
            <Flex align='flex-end' vertical gap={2}>
              <TextContent>Цена за тонну</TextContent>
              <TitleText>{lotData.price_per_ton} ₽</TitleText>
            </Flex>
            <Flex align='flex-end' vertical gap={2}>
              <TextContent>Общая цена</TextContent>
              <TitleText>{lotData.lot_price} ₽</TitleText>
            </Flex>
          </Flex>
        </Flex>
      </ContentWrapper>
      <ActionWrapper justify='flex-end'>
        <Button onClick={() => navigate(`${routes.lot.url}/${lotData.id}`)}>
          Заказать
        </Button>
      </ActionWrapper>
    </Wrapper>
  )
}
