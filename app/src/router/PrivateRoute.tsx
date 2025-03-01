import { Navigate, useLocation } from 'react-router'
import { useUser } from '@/helpers/user/UserProvider'
import { routes } from '@/router/routes'
import { PropsWithChildren } from 'react'

function PrivateRoute({ children }: PropsWithChildren) {
  const { user } = useUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to={routes.login.url} state={{ from: location }} />
  }

  return children
}

export default PrivateRoute
