"use client"
import Image from "next/image"
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import NavbarLink from "./navbarLink";
import { Toaster } from "react-hot-toast";
import Nlink from "./Nlink";



const Navbar = ({ children }: any) => {

    const { data: session } = useSession<any>();
    const pathname = usePathname()

    return (
        <>
            {pathname !== "/login"
                ?
                <div className="flex md:flex-row-reverse flex-wrap bg-gray-100">
                    <div className="w-full p-4 px-10  md:flex  justify-between bg-gray-900 z-10">
                        <Image
                            src={"/logoICODER.png"}
                            width={"256"}
                            height={"36"}
                            alt="ICODER Logo"
                        />
                        <div className="flex justify-evenly items-center gap-4 mt-5 md:mt-0">
                            {session ? <p className="text-white">Bienvenido  {session?.user?.name}</p> : <p></p>}
                            <a href="/api/auth/signout" className="px-4 py-2 text-slate-100 bg-red-700 rounded-md hover:bg-slate-100 hover:text-red-700">Desconectarse</a>
                        </div>
                    </div>

                    {/*Main Content*/}
                    <div className="w-full md:w-4/5 bg-gray-100">
                        <div className="container bg-gray-100 pt-5 px-6">
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                            {children}
                        </div>
                    </div>
                    {/*Sidebar*/}
                    <div className="w-full  md:w-1/5 bg-gray-900 md:bg-gray-900 px-2 text-center fixed bottom-0 md:pt-20 md:top-0 md:left-0 h-16 md:h-screen md:border-r-4 md:border-gray-600">
                        <div className="md:relative mx-auto lg:float-right lg:px-6">
                            <ul className="list-reset flex flex-row gap-2 md:gap-0 md:flex-col text-center md:text-left">
                                {pathname !== "/" ? <NavbarLink active={false} text="Inicio" rute="/" /> : <NavbarLink active={true} text="Inicio" rute="/" />}
                                {pathname !== `/users/view/${session?.user?.identification}` ? <NavbarLink active={false} text="Perfil" rute={`/users/view/${session?.user?.identification}`} /> : <NavbarLink active={true} text="Perfil" rute={`/users/view/${session?.user?.identification}`} />}

                                {pathname !== "/users" ? <NavbarLink active={false} text="Usuarios" rute="/users" /> : <NavbarLink active={false} text="Usuarios" rute="/users" />}
                                <Nlink rute0="/users" rute1="/users/create"/>
                                {pathname !== "/athletes" ? <NavbarLink active={false} text="Deportistas" rute="/athletes" /> : <NavbarLink active={false} text="Deportistas" rute="/athletes" />}
                                {/* {pathname !== "/records" ? <NavbarLink active={false} text="Historiales" rute="/records" /> : <NavbarLink active={true} text="Historiales" rute="/records" />} */}
                                <Nlink rute0="/athletes" rute1="/athletes/create"/>
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <div>
                    {children}
                </div>
            }



        </>
    )
}

export default Navbar