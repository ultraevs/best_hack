import { routes } from '@/router/routes'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

const Content = styled(Flex)`
  height: calc(100vh - 96px);
`

export function NotFound() {
  const navigate = useNavigate()

  return (
    <Content align='center' vertical flex={1} justify='center' gap={16}>
      <h1>Страница не найдена</h1>
      <Button onClick={() => navigate(routes.main.url)}>
        Вернуться на главную
      </Button>
    </Content>
  )
}
