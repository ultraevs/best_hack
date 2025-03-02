import { Button, Flex, Spin, Table, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { routes } from '@/router/routes'
import { useGetUserInfo } from '@/utils/hooks/user'
import { UserInfo } from '@/pages/ProfilePage/components/UserInfo'
import cancelIcon from '@/assets/x.svg'
import * as S from '@/pages/ProfilePage/ProfilePage.styled'
import { IOrder, useGetUserOrders } from '@/utils/hooks/user/useGetUserOrders'
import { ColumnsType } from 'antd/es/table'
import styled from 'styled-components'
import instance from '@/api/axiosInstance'
import { useCookies } from 'react-cookie'
import { useUser } from '@/helpers/user/UserProvider'

const NameText = styled.p`
  color: #101828;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`

const FuelTypeText = styled.p`
  color: #667085;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`

const ActionWrapper = styled.div`
  cursor: pointer;
`

const LogoutButton = styled(Button)`
  width: fit-content;
`

export function ProfilePage() {
  const [cookies] = useCookies(['token'])
  const token = cookies.token

  const { logout } = useUser()

  const getUserInfo = useGetUserInfo()
  const getUserOrders = useGetUserOrders()

  const userInfo = getUserInfo.data

  if (
    getUserInfo.isLoading ||
    getUserInfo.isFetching ||
    getUserOrders.isLoading ||
    getUserOrders.isFetching
  ) {
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

  async function cancelOrder(orderId: number) {
    try {
      const res = await instance({
        url: `orders/${orderId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        getUserOrders.refetch()
      }
    } catch (error) {
      console.error('Error during cancelling user order:', error)
      notification.error({
        message: 'Ошибка при отмене заказа',
      })
      return null
    }
  }

  const columns: ColumnsType<IOrder> = [
    {
      title: 'Заказ',
      key: 'orderDetails',
      width: 708,
      render: (record: IOrder) => (
        <Flex vertical>
          <NameText>{record.nb_name}</NameText>
          <FuelTypeText>{record.fuel_type}</FuelTypeText>
        </Flex>
      ),
    },
    {
      title: 'Топливо, тонны',
      key: 'volume',
      render: (record: IOrder) => <FuelTypeText>{record.volume}</FuelTypeText>,
    },
    {
      title: 'Дата заказа',
      key: 'order_date',
      render: (record: IOrder) => (
        <FuelTypeText>{record.order_date}</FuelTypeText>
      ),
    },
    {
      title: 'Отменить',
      key: 'action',
      width: 115,
      render: (record: IOrder) => {
        return (
          <Flex align='center' justify='center'>
            <ActionWrapper onClick={() => cancelOrder(record.id)}>
              <img src={cancelIcon} alt='cancel icon' />
            </ActionWrapper>
          </Flex>
        )
      },
    },
  ]

  return (
    <Flex vertical gap={32}>
      <Flex vertical gap={16}>
        <S.Title>{routes.profile.title}</S.Title>
        <UserInfo userData={userInfo} />
      </Flex>
      <Table
        bordered
        // @ts-ignore
        columns={columns}
        dataSource={getUserOrders.data ?? []}
        pagination={false}
      />
      <LogoutButton onClick={logout}>Выйти из аккаунта</LogoutButton>
    </Flex>
  )
}
