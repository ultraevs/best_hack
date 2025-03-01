import { useSearchParams } from 'react-router'
import styled from 'styled-components'
import { Dropdown, Flex, Input, Select } from 'antd'
import { useGetLotsFilters } from '@/utils/hooks/lots'

const SearchInput = styled(Input.Search)`
  width: 320px;
`

const RegionSelect = styled(Select)`
  width: 320px;
`

const OilTypeSelect = styled(Select)`
  width: 260px;
`

const VolumeInput = styled(Input)`
  width: 252px;
`

const PriceWrapper = styled.div`
  width: 320px;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  p {
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
  }
`

const PriceDropdown = styled.div`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
`

const PriceInput = styled(Input)`
  width: 130px;
`

export function Filters() {
  const { data: lotsFilters } = useGetLotsFilters()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')
  const minVolume = searchParams.get('minVolume')
  const priceFrom = searchParams.get('priceFrom')
  const priceTo = searchParams.get('priceTo')

  const handleParamChange = (key: string, value: string) => {
    if (!value && searchParams.has(key)) {
      searchParams.delete(key)
    } else {
      searchParams.set(key, value)
    }

    setSearchParams(searchParams)
  }

  const handleRegionChange = (selectedRegions: any) => {
    if (selectedRegions.length === 0) {
      searchParams.delete('regions')
    } else {
      searchParams.set('regions', selectedRegions.join(','))
    }

    setSearchParams(searchParams)
  }

  const handleOilTypesChange = (selectedOilTypes: any) => {
    if (selectedOilTypes.length === 0) {
      searchParams.delete('oilTypes')
    } else {
      searchParams.set('oilTypes', selectedOilTypes.join(','))
    }

    setSearchParams(searchParams)
  }

  const regionItems =
    lotsFilters?.nb_region.map(item => {
      return { value: item }
    }) ?? []

  const oilTypeItems =
    lotsFilters?.fuel_type.map(item => {
      return { value: item }
    }) ?? []

  return (
    <Flex vertical gap={16}>
      <SearchInput
        value={search ?? ''}
        onChange={e => handleParamChange('search', e.target.value)}
        placeholder='Поиск'
      />
      <Flex align='center' gap={16}>
        <RegionSelect
          allowClear={false}
          options={regionItems}
          onChange={handleRegionChange}
          value={
            searchParams.has('regions')
              ? searchParams.get('regions')?.split(',').filter(Boolean)
              : null
          }
          mode='multiple'
          placeholder='Регион'
        />
        <OilTypeSelect
          options={oilTypeItems}
          onChange={handleOilTypesChange}
          value={
            searchParams.has('oilTypes')
              ? searchParams.get('oilTypes')?.split(',').filter(Boolean)
              : null
          }
          mode='multiple'
          placeholder='Вид Топлива'
        />
        <VolumeInput
          value={minVolume ?? ''}
          onChange={e => handleParamChange('minVolume', e.target.value)}
          placeholder='Миниальный объём'
        />
        <Dropdown
          dropdownRender={() => (
            <PriceDropdown>
              <Flex align='center' gap={16}>
                <PriceInput
                  value={priceFrom ?? ''}
                  onChange={e => handleParamChange('priceFrom', e.target.value)}
                  placeholder='От'
                />
                <PriceInput
                  value={priceTo ?? ''}
                  onChange={e => handleParamChange('priceTo', e.target.value)}
                  placeholder='До'
                />
              </Flex>
            </PriceDropdown>
          )}
          trigger={['click']}
        >
          <PriceWrapper>
            <p>Цена за тонну</p>
          </PriceWrapper>
        </Dropdown>
      </Flex>
    </Flex>
  )
}
