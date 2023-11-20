"use client"
import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"

const Protected = ({children}) => {
    const { status } = useSession();
    const path = usePathname();
    if(status == "authenticated"){
        return <>{children}</>;
    } else if(status == "unauthenticated"){
      if(path != "/signin" && path != "/signup"){
        redirect("/signin")
      } else{
        return <>{children}</>;
      }
    }
}

export default Protected