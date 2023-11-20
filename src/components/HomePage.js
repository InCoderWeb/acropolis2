import React from 'react'
import Navbar from "@/components/Navbar"
import { redirect } from 'next/navigation'

const HomePage = () => {
  redirect('/paperpublications')
  return (
    <>
      <div className="h-screen w-screen">
        <Navbar/>
      </div>
    </>
  )
}

export default HomePage