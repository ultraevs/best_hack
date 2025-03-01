import { ILot } from '@/utils/hooks/lots/useGetLots'
import { Flex } from 'antd'
import lotLogo from '@/assets/gavel.svg'

interface LotCardProps {
  lotData: ILot
}

export function LotCard({ lotData }: LotCardProps) {
  return (
    <Flex>
      <Flex align='center' gap={24}>
        <Flex gap={8}>
          <img src={lotLogo} alt='gavel' />
        </Flex>
      </Flex>
    </Flex>
  )
}
