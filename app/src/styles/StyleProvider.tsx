import { ConfigProvider } from 'antd'
import { antdTheme } from '@/styles/antdTheme'
import { PropsWithChildren } from 'react'

export function StyleProvider({ children }: PropsWithChildren) {
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
}
