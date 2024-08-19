'use client'
import RutineTable from '@/app/components/rutines/table/page'
import { gruposMusculares } from '@/libs/gruposMusculares'
import { pechoEjercicios } from '@/utils/ejercicios'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlus } from "react-icons/fa";



const RutinePage = () => {

    const navigation = useRouter()
    const athleteID = useParams()

    return (
        <div className='w-full h-screen'>
            <div className="container w-full mx-auto py-4 text-slate-900">

                {/* header */}
                <div className=' bg-slate-800 py-2 mb-2 px-4 col-span-4 flex gap-4 items-center justify-between '>
                    <button
                        type='button'
                        onClick={() => navigation.push(`/athletes/view/${athleteID.id}`)}
                        className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
                    >
                        Volver
                    </button>

                    <div className='flex items-center gap-4'>
                        <button
                            className='bg-green-600 px-4 py-1 text-sm rounded-md  text-slate-100 flex items-center gap-2'
                            onClick={e => { navigation.push(`/rutine/athlete/create/${athleteID.id}`) }}
                        >
                            <FaPlus className='text-sm' />
                            Crear
                        </button>
                    </div>
                </div>
                {/* header */}

                <RutineTable />

            </div>
        </div >
    )
}

export default RutinePage