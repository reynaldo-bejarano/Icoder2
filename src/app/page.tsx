"use client"
import { useSession } from "next-auth/react"



const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name)
  return (

   

      <div className='w-full h-screen'>
        <div className="container w-full mx-auto py-4 text-slate-900">
          
        </div>
      </div>
    


  )
}

export default DashboardPage
