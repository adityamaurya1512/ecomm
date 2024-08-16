  "use server"
  import { signIn } from "@/auth"
  import { CredentialsSignin } from "next-auth"
const credentialLogin=async (email:string,password:string)=>{
  
   try
      {  
        await signIn("credentials",{
        email,
        password,
        })
      }
   catch(error){
    const err= error as CredentialsSignin;
    return err.message
   }

}
export {credentialLogin}
