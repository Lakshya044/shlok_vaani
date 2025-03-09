import {auth} from "@/auth"

// Demo for the protected routing
export default async function Secret() {
    const session = await auth() ; 
    console.log("Session being printed from secret folder inside components " , session) ;
    if(!session){
        return (
            <div>
                <h1>Not Authorized</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>Welcome to the secret content</h1>
        </div>
    )
}