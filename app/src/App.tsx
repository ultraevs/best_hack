// @ts-ignore
import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router'
import { Router } from '@/router/Router'
import { UserProvider } from '@/helpers/user/UserProvider'
import { useCookies } from 'react-cookie'
import { StyleProvider } from './styles/StyleProvider'

function App() {
  const [cookies, setCookies] = useCookies(['token'])

  const user = { id: 1, name: 'Kostya', email: 'kostya1703tsoy@gmail.com' }

  return (
    <BrowserRouter>
      <StyleProvider>
        <UserProvider initialUser={null}>
          <Router />
        </UserProvider>
      </StyleProvider>
    </BrowserRouter>
  )
}

export default App
