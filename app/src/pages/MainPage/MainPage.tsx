import { Flex } from 'antd'
import { Filters } from '@/pages/MainPage/components/Filters'
import { useGetLots } from '@/utils/hooks/lots'
import { LotCard } from '@/pages/MainPage/components/LotCard'

import * as S from '@/pages/MainPage/MainPage.styled'

export function MainPage() {
  const { data: lotsData, isLoading, isFetching } = useGetLots()

  if (isLoading || isFetching) {
    return null
  }

  const lots = lotsData ?? []

  return (
    <Flex vertical gap={32}>
      <S.Title>
        Топливо <br /> на lukoil lots.
      </S.Title>
      <Filters />
      {lots.map(item => (
        <LotCard lotData={item} />
      ))}
    </Flex>
  )
}
