"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { credentialLogin } from "@/actions/login"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router =useRouter()
  return (
    <form
      action={async (formData: FormData) => {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        if (!email || !password) throw new Error("Please provide all fields")
        const error = await credentialLogin(email, password)
        if(!error)
        {
            router.refresh()
        }

      }}
      className='flex flex-col gap-4'
    >
      <Input type="email" placeholder='Email' name="email" />
      <Input type="password" placeholder='Password' name="password" />
      <Button type="submit">Login</Button>
    </form>
  )
}

export { LoginForm }
