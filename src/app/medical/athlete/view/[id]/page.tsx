'use client'
import { useParams, useRouter } from 'next/navigation'
import { FaPlus } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import axios from 'axios';
import converterIsoStringToDate from '@/hooks/converterIsoStringToDate';
import { useSession } from 'next-auth/react';

const ViewMedical = () => {
    const { data: session } = useSession<any>();
    const navigation = useRouter();
    const athleteID = useParams()
    const [medical, setMedical] = useState([])

    useEffect(() => {

        async function getData() {
            try {
                const res = await axios.get(`/api/auth/medical/view/${athleteID.id}`)
                setMedical(res.data.medicalDataByID)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData()
    }, [athleteID])

    return (
        <div className='w-full h-screen'>

            <div className="container w-full mx-auto py-4 text-slate-900">

                {/* header */}
                <div className=' bg-slate-800 py-2 px-4 mb-4 col-span-4 flex gap-4 items-center justify-between '>
                    <button
                        type='button'
                        onClick={() => navigation.push(`/athletes/view/${athleteID.id}`)}
                        className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
                    >
                        Volver
                    </button>
                    <div className='flex gap-2'>
                        <button
                            className='bg-slate-200 px-4 py-1 text-sm rounded-md  text-slate-900 flex items-center gap-2'
                            onClick={e => { navigation.push(`/historical/athlete/medical/view/${athleteID.id}`) }}
                        >
                            <FaPlus className='text-sm' />
                            Historial
                        </button>


                        {session?.user?.role === "médico" &&
                            <button
                                className='bg-green-600 px-4 py-1 text-sm rounded-md  text-slate-100 flex items-center gap-2'
                                onClick={e => { navigation.push(`/medical/athlete/create/${athleteID.id}`) }}
                            >
                                <FaPlus className='text-sm' />
                                Crear informe médico
                            </button>
                        }
                        {session?.user?.role === "terapía física" &&
                            <button
                                className='bg-green-600 px-4 py-1 text-sm rounded-md  text-slate-100 flex items-center gap-2'
                                onClick={e => { navigation.push(`/medical/athlete/create/${athleteID.id}`) }}
                            >
                                <FaPlus className='text-sm' />
                                Crear informe médico
                            </button>
                        }
                        {session?.user?.role === "admin" &&
                            <button
                                className='bg-green-600 px-4 py-1 text-sm rounded-md  text-slate-100 flex items-center gap-2'
                                onClick={e => { navigation.push(`/medical/athlete/create/${athleteID.id}`) }}
                            >
                                <FaPlus className='text-sm' />
                                Crear informe médico
                            </button>
                        }
                    </div>

                </div>
                {/* header */}

                {/* tabla */}

                <div className="container w-full mx-auto ">
                    <div className="bg-gray-800  text-gray-100 text-center">
                    </div>
                    <div className="lg:mt-0 rounded shadow bg-white">
                        <table
                            className="w-full text-sm grid"
                        >
                            <thead>
                                <tr className="bg-gray-900 grid text-left grid-cols-12 bg-opacity-100 py-2 px-2 text-sm text-white font-normal">

                                    <th className=" col-span-1 ">Estado</th>
                                    <th className=" col-span-1">Identificación</th>
                                    <th className=" col-span-2">Deportista</th>
                                    <th className=" col-span-2">Doctor</th>
                                    <th className=" col-span-1">Área lesión</th>
                                    <th className=" col-span-1">Tipo</th>
                                    <th className=" col-span-1 ">Grado</th>
                                    <th className=" col-span-1 ">Registrada</th>
                                    <th className=" col-span-1 ">T. recuperación</th>
                                    <th className=" col-span-1 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {medical.length > 0 ? medical.map<any>((item: any) => {
                                    return (
                                        <tr className="text-slate-900 text-left grid grid-cols-12 px-2 gap-2 border py-2 capitalize" key={item._id}>
                                            <td className=" col-span-1 ">
                                                <span className={item?.active ? "bg-green-800 rounded-md p-1 text-slate-100 text-xs" : "bg-red-800 text-slate-100 rounded-md p-1 text-xs"}>
                                                    {item?.active ? "activa " : "recuperada"}
                                                </span>
                                            </td>
                                            <td className=" col-span-1">{item?.athlete?.identification}</td>

                                            <td className=" col-span-2">{item?.athlete?.name} {item?.athlete?.lastname1} {item?.athlete?.lastname2}</td>

                                            <td className=" col-span-2">{item?.doctor.name} {item?.doctor.lastname1} {item?.doctor.lastname2}</td>
                                            <td className=" col-span-1">{item?.lesion?.area}</td>
                                            <td className=" col-span-1">{item?.lesion?.tipo}</td>
                                            <td className=" col-span-1">{item?.lesion?.grado}</td>
                                            <td className=" col-span-1">{converterIsoStringToDate(item?.createdAt)}</td>
                                            <td className=" col-span-1">{item?.lesion?.recuperacion || "s"}</td>
                                            <td className=" flex gap-2 items-center justify-center col-span-1">
                                                <button onClick={() => navigation.push(`/medical/athlete/review/${item?._id}`)} className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center ">
                                                    <BsFillInfoSquareFill />
                                                </button>
                                            </td>
                                        </tr>
                                    )


                                })
                                    :
                                    <tr className="text-slate-900 text-left grid grid-cols-12 px-2 gap-2 border py-2 ">
                                        <td className="col-span-12  text-center py-2">No existen lesiones registradas para este deportista</td>

                                    </tr>

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* tabla */}




            </div>
        </div>
    )
}

export default ViewMedical