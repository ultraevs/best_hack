import { Flex } from 'antd'
import { routes } from '@/router/routes'
import { useGetUserInfo } from '@/utils/hooks/user'
import { UserInfo } from '@/pages/ProfilePage/components/UserInfo'

import * as S from '@/pages/ProfilePage/ProfilePage.styled'

export function ProfilePage() {
  const { data, isLoading, isFetching } = useGetUserInfo()

  if (isLoading || isFetching) {
    return null
  }

  data

  return (
    <Flex vertical gap={32}>
      <Flex vertical gap={16}>
        <S.Title>{routes.profile.title}</S.Title>
        <UserInfo userData={data} />
      </Flex>
    </Flex>
  )
}
