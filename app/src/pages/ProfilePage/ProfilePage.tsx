import { useUser } from "@/helpers/user/UserProvider"

export function ProfilePage() {
  const { user } = useUser()

  console.log({ user })
  
  return <h1>Profile Page</h1>
}
