"use client"
import { useSession } from "next-auth/react"
import Image from "next/image";



const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name)
  return (



    <div className='w-full h-screen'>
      <div className="container w-full mx-auto py-4 text-slate-900 flex justify-center items-center">
        <Image
          src={"/logoICODER_2023.png"}
          width={"760"}
          height={"100"}
          alt="ICODER Logo"
        />
      </div>
    </div>



  )
}

export default DashboardPage
