import { Route, Routes } from 'react-router'
import { routes } from '@/router/routes'
import PrivateRoute from '@/router/PrivateRoute'
import { MainPage } from '@/pages/MainPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { NotFound } from '@/pages/NotFound'
import { LoginPage } from '@/pages/Auth/LoginPage'
import { RegisterPage } from '@/pages/Auth/RegisterPage'

export function Router() {
  return (
    <Routes>
      <Route path={routes.main.url} element={<MainPage />} />
      <Route
        path={routes.profile.url}
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path={routes.login.url} element={<LoginPage />} />
      <Route path={routes.register.url} element={<RegisterPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
