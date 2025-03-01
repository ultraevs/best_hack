import { IUserInfo } from '@/utils/hooks/user/useGetUserInfo'
import { Flex } from 'antd'
import styled from 'styled-components'

const Text = styled.p`
  color: #000000b2;
  font-weight: 400;
  font-size: 16px;
  line-height: 21.86px;
`

interface UserInfoProps {
  userData: IUserInfo | null | undefined
}

export function UserInfo({ userData }: UserInfoProps) {
  return (
    <Flex vertical gap={2}>
      <Text>{userData?.username}</Text>
      <Text>{userData?.email}</Text>
    </Flex>
  )
}
