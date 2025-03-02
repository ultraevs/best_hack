import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Flex, Spin } from 'antd'
import { Filters } from '@/pages/MainPage/components/Filters'
import { useGetLots } from '@/utils/hooks/lots'
import { LotCard } from '@/pages/MainPage/components/LotCard'
import { LoadingOutlined } from '@ant-design/icons'

import * as S from '@/pages/MainPage/MainPage.styled'

const filterKeys = [
  'search',
  'regions',
  'oilTypes',
  'minVolume',
  'priceFrom',
  'priceTo',
]

export function MainPage() {
  const [searchParams] = useSearchParams()
  
  const filters = Object.fromEntries(
    filterKeys.map(key => [key, searchParams.get(key) ?? null]),
  )

  const {
    data: lotsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetLots({
    search_query: filters.search,
    nb_region: filters.regions,
    fuel_type: filters.oilTypes,
    min_available_volume: filters.minVolume,
    min_price: filters.priceFrom,
    max_price: filters.priceTo,
  })

  useEffect(() => {
    refetch()
  }, [searchParams])

  const lots = lotsData ?? []

  return (
    <Flex vertical gap={32} style={{ marginBottom: 64 }}>
      <S.Title>
        Топливо <br /> на lukoil lots.
      </S.Title>
      <Filters />
      {isLoading || isFetching ? (
        <Flex align='center' justify='center' style={{ width: '100%', height: 300 }}>
          <Spin indicator={<LoadingOutlined spin />} size='large' />
        </Flex>
      ) : (
        lots.map((item, index) => (
          <LotCard
            key={`${item.nb_name}_${item.nb_region}_${index}`}
            lotData={item}
          />
        ))
      )}
    </Flex>
  )
}
