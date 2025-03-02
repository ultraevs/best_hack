import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'
import { useCookies } from 'react-cookie'

interface IUser {
  sub: string
  id: number
  email: string
  exp: number
}

export type UserType = IUser | null

interface IUserContext {
  user: UserType
  setUser: (value: UserType) => void
  logout: () => void
}

const userContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  logout: () => {},
})

export function UserProvider({
  initialUser,
  children,
}: PropsWithChildren<{ initialUser: UserType }>) {
  const [user, setUser] = useState<any>(initialUser)
  const [_cookies, _setCookie, removeCookie] = useCookies(['token'])

  function logout() {
    setUser(null)
    removeCookie('token', { path: '/' })
  }

  useEffect(() => {
    setUser(initialUser)
  }, [initialUser])

  return (
    <userContext.Provider value={{ user, setUser, logout }}>
      {children}
    </userContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(userContext)
  return context
}
