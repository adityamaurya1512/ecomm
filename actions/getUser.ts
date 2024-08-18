"use server"

import { auth } from "@/auth"
const getUserEmail=async ()=>{
    "use server"
     const session= await auth()
     
     return session?.user?.email || ""
  }

  export {getUserEmail}