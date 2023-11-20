"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
  

export default function Navbar() {
  const [state, setState] = React.useState(false)
  const data = useSession();
  const firstName = data.data.user.name[0].split();
  const lastName = data.data.user.name[1].split();

  const menus = [
    // { title: "Home", path: "/" },
    { title: "Paper Publications", path: "/paperpublications" },
    { title: "Events", path: "/events" },
  ]

  return (
    <nav className="bg-[#f3f4f6] w-full border-b md:border-0 h-[5rem]">
      <div className="items-center bg-white md:bg-transparent justify-between px-4 max-w-screen-xl mx-auto md:flex md:px-8 z-[9] relative">
        <div className="flex items-center justify-between py-3 md:py-5 md:block border-b md:border-b-0">
          <Link href="/" className="flex items-center">
            <img src={"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOvm56EUJsSDp-c9ebwFgujoMB3twAaoS55ttO-3RqkDKz-xKGI5GREhg076IatTYNy5Jn_wd0kiunwG__ceRMB66gzOU1PQIW8lUVc_CnhiKBvvPJ5N-n0w2Bdrj1qg6mUfP7pNix6_0JTJY_mWTu7mcIkseTTtsgdQfaZHzZhAnvuCzoLUheKJCbm-YE/s320/acro.png"} alt="Logo" className="h-[3.5rem] mr-1" />
            {/* <h1 className="text-3xl font-bold text-blue-700 hover:text-blue-900">
                Acropolis
            </h1> */}
          </Link>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border mr-2"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar className="bg-gray-600 cursor-pointer">
                    <AvatarImage src="ng" />
                    <AvatarFallback className="uppercase">{firstName[0]}{lastName[0]}</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {signOut()}}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          className={`flex-1 w-fit pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-800 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <div className="hidden md:block">
              <DropdownMenu>
                  <DropdownMenuTrigger>
                  <Avatar className="bg-gray-600 cursor-pointer">
                      <AvatarImage src="ng" />
                      <AvatarFallback className="uppercase">{firstName[0]}{lastName[0]}</AvatarFallback>
                  </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {signOut()}}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}