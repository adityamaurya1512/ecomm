
import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { CredentialsSignin } from 'next-auth'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { auth } from '@/auth'
import { LoginForm } from '@/components/client/form'


export const LoginPage =async  () => {
  const session= await auth()
  if(session?.user)
    redirect('/')


  
  return (
    <div className='flex items-center justify-center h-dvh'>
        <Card>
  <CardHeader>
    <CardTitle>Login</CardTitle>
  </CardHeader>
  <CardContent >
    <LoginForm/>
  </CardContent>
  <CardFooter>
  <Link href="/signup">Don't have an account?<span className='text-blue-500'>SignUp</span></Link>
  </CardFooter>
</Card>

    </div>
  )
}

export default LoginPage
