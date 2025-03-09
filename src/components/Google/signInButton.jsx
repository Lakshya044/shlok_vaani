
import { auth , signIn , signOut } from "@/auth"
 
export default async function SignIn() {

    const session = await auth() ; 
    console.log(session) ;
    
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      {
        session ? <div className = "bg-red-400 h-20"></div> : <div></div>
      }
      
      <button type="submit">Signin with Google</button>
    </form>
  )
} 