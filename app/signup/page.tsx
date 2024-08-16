import React from 'react'
import Link from 'next/link'
import { hash } from 'bcryptjs'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
import User from '@/models/users'
import { redirect } from 'next/navigation'
import connectToDatabase from '@/lib/db'
const SignUpPage = () => {
    const signUp=async (formdata:FormData)=>{
        "use server"
        const email=formdata.get("email") as string | undefined
        const password=formdata.get("password") as string | undefined
        if(!email || !password)
            throw new Error("Please provide all fields")
        await connectToDatabase()
        const user=await User.findOne({email})
        if(user)
            throw new Error("user already exist");
        const hashedPassword= await hash(password,10)
        await User.create({email,password:hashedPassword})
        redirect("/login")
    
    }
  return (
    <div className='flex items-center justify-center h-dvh'>
    <Card>
<CardHeader>
<CardTitle>Sign Up</CardTitle>
</CardHeader>
<CardContent >

<form action={signUp} className='flex flex-col gap-4'>
<Input type="email" placeholder='Email' name="email"/>
<Input type="password" placeholder='Password' name="password"/>
<Button type="submit"> SignUp</Button>
</form>
</CardContent>
<CardFooter>
<Link href="/login">Already have an account?<span className='text-blue-500'>Login</span></Link>
</CardFooter>
</Card>

</div>
  )
}

export default SignUpPage