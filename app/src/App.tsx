// @ts-ignore
import React from 'react'
import './App.css'
import { jwtDecode } from 'jwt-decode'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from '@/router/Router'
import { UserProvider, UserType } from '@/helpers/user/UserProvider'
import { useCookies } from 'react-cookie'
import { StyleProvider } from '@/styles/StyleProvider'
import { Layout } from '@/components/layout/Layout'

function App() {
  const queryClient = new QueryClient()
  const [cookies] = useCookies(['token'])
  const token = cookies.token
  const initialUser = token ? jwtDecode(token) : null

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StyleProvider>
          <UserProvider initialUser={initialUser as UserType}>
            <Layout>
              <Router />
            </Layout>
          </UserProvider>
        </StyleProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
