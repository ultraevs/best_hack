// @ts-ignore
import React from 'react'
import './App.css'
import { jwtDecode } from 'jwt-decode'
import { BrowserRouter } from 'react-router'
import { Router } from '@/router/Router'
import { UserProvider, UserType } from '@/helpers/user/UserProvider'
import { useCookies } from 'react-cookie'
import { StyleProvider } from '@/styles/StyleProvider'
import { Layout } from '@/components/layout/Layout'

function App() {
  const [cookies] = useCookies(['token'])
  const token = cookies.token
  const initialUser = token ? jwtDecode(token) : null

  return (
    <BrowserRouter>
      <StyleProvider>
        <UserProvider initialUser={initialUser as UserType}>
          <Layout>
            <Router />
          </Layout>
        </UserProvider>
      </StyleProvider>
    </BrowserRouter>
  )
}

export default App
