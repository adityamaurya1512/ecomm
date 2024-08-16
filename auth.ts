import { error } from "console"
import NextAuth ,{CredentialsSignin}from "next-auth"
import CredentialProvider from 'next-auth/providers/credentials'
import User from "./models/users"
import { compare } from "bcryptjs"
import connectToDatabase from "./lib/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialProvider({
    credentials:{
        email:{
            label:"Email",
            type:"email",
        },
        password:{
            label:"Password",
            type:"password"
        },
    },
    authorize:async(credentials)=>{
        const email=credentials.email as string | undefined
        const password=credentials.password as string | undefined
        
         if(!email || !password)
          throw new Error("Email or Password not valid")
         await connectToDatabase()
        const user=await User.findOne({email}).select("+password")
        if(!user)
            throw new CredentialsSignin("Invalid user or password");
        if(!user.password)
            throw new CredentialsSignin("Invalid user or password");
     
        const isMatch= await compare(password,user.password)
        
        if(!isMatch)
            throw new CredentialsSignin("Invalid user or password");

       
          return {email:user.email,id:user._id}
    }
    })

  ],
  pages:{
    signIn:"/login",
  }
})