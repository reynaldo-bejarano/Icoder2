import { usePathname } from 'next/navigation'
import React from 'react'

const Nlink = ({ rute0, rute1 }: { rute0: string, rute1: string }) => {
    const pathname = usePathname()
    return (
        <>

            <div

                className="block py-1  pl-1 cursor-pointer align-middle text-gray-800 no-underline  hover:text-pink-500 md:border-slate-100 hover:border-slate-100"
            >
                <i className="fas fa-link pr-0 md:pr-3" />
                <span className="md:pb-0 text-xs md:text-base md:pr-3 text-gray-600 w-full  md:text-gray-400 block md:inline-block">
                    <a href={`${rute0}`} className={pathname === `${rute0}` ? 'text-right text-sm py-1 pl-2 flex  border-b-2 border-cyan-500' : 'text-right text-sm py-1 flex  border-b-2 border-transparent hover:border-slate-100 pl-2 '}>Visualizar</a>
                    <a href={`${rute1}`} className={pathname === `${rute1}` ? 'text-right text-sm py-1 flex pl-2  border-b-2 border-cyan-500' : 'text-right text-sm py-1 flex border-b-2 border-transparent hover:border-slate-100 pl-2'}>Agregar</a>
                </span>
            </div>




        </>
    )
}

export default Nlink