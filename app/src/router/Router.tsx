import { Route, Routes } from 'react-router'
import { routes } from '@/router/routes'
import PrivateRoute from '@/router/PrivateRoute'
import { MainPage } from '@/pages/MainPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { NotFound } from '@/pages/NotFound'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { AdminPage } from '@/pages/AdminPage'
import { LotPage } from '@/pages/LotPage'

export function Router() {
  return (
    <Routes>
      <Route
        path={routes.main.url}
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
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
      <Route path={routes.register.url} element={<RegisterPage />} />
      <Route
        path={routes.admin.url}
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route path={`${routes.lot.url}/:id`} element={<LotPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
