'use client'
import { useParams, useRouter } from 'next/navigation'
import { FaPlus } from "react-icons/fa";

import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';



const ViewMorphological = () => {

    const navigation = useRouter();
    const athleteID = useParams()
    const [medical, setMedical] = useState([])
    const [athlete, setAthlete] = useState<any>();
    const [morphological, setMorphological] = useState<any>();
    



    useEffect(() => {
        async function fetchData() {
          try {
            const res = await axios.get(`/api/auth/athletes/view/${athleteID.id}`)
            setMorphological(res.data.morphologicalData[0])
            console.log(res.data.morphologicalData[0]._id)
          } catch (error) {
            if (error instanceof AxiosError) console.error('Error fetching data:', error);
          }
        }
        fetchData()
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
                            onClick={e => { navigation.push(`/historical/athlete/morphological/view/${athleteID.id}`) }}
                        >
                            <FaPlus className='text-sm' />
                            Historial
                        </button>
                        <button
                            className='bg-green-600 px-4 py-1 text-sm rounded-md  text-slate-100 flex items-center gap-2'
                            onClick={e => { navigation.push(`/morphological/update/${morphological._id}`) }}
                        >
                            <FaPlus className='text-sm' />
                            Actualizar datos
                        </button>
                    </div>

                </div>
                {/* header */}

                {/* Morfologia */}
                <div className='w-full bg-slate-200 p-4 col-span-4'>
                    <div className='bg-slate-800'>
                        <h2 className='text-slate-100 w-full mx-4'>Datos morfológicos</h2>
                    </div>
                    <div className='grid md:grid-cols-6 gap-2 '>
                        {/* basico */}
                        <div className='grid col-span-6 md:col-span-1 gap-2 '>
                            <div className='grid gap-2 mt-2 p-2 bg-slate-100'>
                                <label className='text-center'>Basíco</label>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Estatura</label>
                                        <div className='grid grid-cols-2 '>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.basic?.height || "0"}</span>
                                            <p>cm</p>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Peso</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.basic?.weight || "0"}</span>
                                            <p>kl</p>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>IMC</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.basic?.IMC || "0"}</span>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* basico */}

                        {/* porcentaje */}
                        <div className='grid col-span-6 md:col-span-1 gap-2 '>
                            <div className='grid gap-2 mt-2 p-2 bg-slate-100'>
                                <label className='text-center'>Porcentaje</label>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Grasa</label>
                                        <div className='grid grid-cols-2 '>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.percentage?.fat || "0"}</span>
                                            <span>%</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Musculo</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.percentage?.muscle || "0"}</span>
                                            <span>%</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Agua</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.percentage?.water || "0"}</span>
                                            <span>%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* porcentaje */}

                        {/* circunferencia */}
                        <div className='grid col-span-6 md:col-span-1 gap-2 '>
                            <div className='grid gap-2 mt-2 p-2 bg-slate-100'>
                                <label className='text-center'>Cincunferencia</label>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Cintura</label>
                                        <div className='grid grid-cols-2 '>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.circumference?.waist || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Cadera</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.circumference?.hip || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* circunferencia */}
                        {/* Brazo */}
                        <div className='grid col-span-6 md:col-span-1 gap-2 '>
                            <div className='grid gap-2 mt-2 p-2 bg-slate-100'>
                                <label className='text-center'>Circunferencia Brazos</label>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Derecho</label>
                                        <div className='grid grid-cols-2 '>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.arms?.aright || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Izquierdo</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.arms?.aleft || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Brazo */}

                        {/* pierna */}
                        <div className='grid col-span-6 md:col-span-1 gap-2 '>
                            <div className='grid gap-2 mt-2 p-2 bg-slate-100'>
                                <label className='text-center'>Circunferencia Pierna</label>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Derecha</label>
                                        <div className='grid grid-cols-2 '>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.legs?.lright || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Izquierda</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.legs?.lleft || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* pierna */}

                        {/* gastrocnemio */}
                        <div className='grid col-span-6 md:col-span-1 gap-2 '>
                            <div className='grid gap-2 mt-2 p-2 bg-slate-100'>
                                <label className='text-center'>Gastrocnemio</label>
                                <div>
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Derecho</label>
                                        <div className='grid grid-cols-2 '>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.gastrocnemius?.gright || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='grid grid-cols-2 gap-2 '>
                                        <label className='col-span-1'>Izquierdo</label>
                                        <div className='grid grid-cols-2'>
                                            <span className='w-8 text-center bg-slate-100'>{morphological?.gastrocnemius?.gleft || "0"}</span>
                                            <span>cm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* gastrocnemio */}
                    </div>
                </div>






            </div>
        </div>
    )
}

export default ViewMorphological