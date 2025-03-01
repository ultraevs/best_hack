import { useState, createContext, PropsWithChildren, useContext } from 'react'

interface IUserContext {
  user: any
  logout: () => void
}

const userContext = createContext<IUserContext>({
  user: null,
  logout: () => {},
})

export function UserProvider({
  initialUser,
  children,
}: PropsWithChildren<{ initialUser: any }>) {
  const [user, setUser] = useState<any>(initialUser)

  function logout() {
    setUser(null)
  }

  return (
    <userContext.Provider value={{ user, logout }}>
      {children}
    </userContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(userContext)
  return context
}
