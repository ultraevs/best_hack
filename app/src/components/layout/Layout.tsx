import { PropsWithChildren } from 'react'
import { Header } from '@/components/layout/Header'
import styled from 'styled-components'
import { Flex } from 'antd'

const Main = styled.main`
  max-width: 1440px;
  width: 100%;
  padding: 24px 120px 0;
`

export function Layout({ children }: PropsWithChildren) {
  return (
    <Flex vertical align='center'>
      <Header />
      <Main>{children}</Main>
    </Flex>
  )
}
