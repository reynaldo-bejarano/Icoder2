'use client'
import { useParams, useRouter } from 'next/navigation'
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import axios from 'axios';
import converterIsoStringToDate from '@/hooks/converterIsoStringToDate';


const HistoricalMorphological = () => {

    const navigation = useRouter();
    const athleteID = useParams()
    const [morphological, setMorphological] = useState([])

    useEffect(() => {

        async function getData() {
            try {
                const res = await axios.get(`/api/auth/morphological/historical/athlete/view/${athleteID.id}`)
                console.log(res.data.morphologicalDataByID)
                setMorphological(res.data.morphologicalDataByID)
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
                        onClick={() => navigation.push(`/morphological/view/${athleteID.id}`)}
                        className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
                    >
                        Volver
                    </button>


                </div>
                {/* header */}

                {/* tabla */}

                <div className="container w-full mx-auto ">
                    
                    <div className="lg:mt-0 rounded shadow bg-white">
                        <table
                            className="w-full text-sm grid"
                        >
                            <thead>
                                <tr className="bg-gray-900 text-center grid grid-cols-15 bg-opacity-100 py-2 px-2 text-xs text-white font-normal">
                                    <th className=" col-span-1 ">Fecha</th>
                                    <th className=" col-span-1">Altura</th>
                                    <th className=" col-span-1">Peso</th>
                                    <th className=" col-span-1">IMC</th>
                                    <th className=" col-span-1">Grasa</th>
                                    <th className=" col-span-1 ">Musculo</th>
                                    <th className=" col-span-1 ">Agua</th>
                                    <th className=" col-span-1 ">C. Cadera</th>
                                    <th className=" col-span-1">C. cintura</th>
                                    <th className=" col-span-1 ">C.B. Derecho</th>
                                    <th className=" col-span-1">C.B. Izquierdo</th>
                                    <th className=" col-span-1 ">C.P. Derecha</th>
                                    <th className=" col-span-1">C.P. Izquierda</th>
                                    <th className=" col-span-1 ">G. Derecho</th>
                                    <th className=" col-span-1">G. Izquierdo</th>
                                </tr>
                            </thead>
                            <tbody>

                                {morphological.length > 0 ? morphological.map<any>((item: any) => {
                                    return (
                                        <tr className="text-slate-900 text-center grid grid-cols-15 px-2 gap-2 border py-2 text-xs capitalize" key={item._id}>
                                            <td className=" col-span-1 ">
                                                <span className={item?.active ? "bg-green-800 rounded-md p-1 text-slate-100" : "bg-red-800 text-slate-100 rounded-md p-1 text-xs"}>
                                                    {converterIsoStringToDate(item?.createdAt)}
                                                </span>
                                            </td>
                                            <td className=" col-span-1">{item?.basic?.height}</td>
                                            <td className=" col-span-1">{item?.basic?.weight} </td>
                                            <td className=" col-span-1">{item?.basic?.IMC}</td>
                                            <td className=" col-span-1">{item?.percentage?.fat}</td>
                                            <td className=" col-span-1">{item?.percentage?.muscle} </td>
                                            <td className=" col-span-1">{item?.percentage?.water}</td>
                                            <td className=" col-span-1">{item?.circumference?.waist} </td>
                                            <td className=" col-span-1">{item?.circumference?.hip}</td>
                                            <td className=" col-span-1">{item?.arms?.aright} </td>
                                            <td className=" col-span-1">{item?.arms?.aleft}</td>
                                            <td className=" col-span-1">{item?.legs?.lright} </td>
                                            <td className=" col-span-1">{item?.legs?.lleft}</td>
                                            <td className=" col-span-1">{item?.gastrocnemius?.gright} </td>
                                            <td className=" col-span-1">{item?.gastrocnemius?.gleft}</td>
                                        </tr>
                                    )


                                })
                                    :
                                    <tr className="text-slate-900 text-left grid grid-cols-12 px-2 gap-2 border py-2 ">
                                        <td className="col-span-12  text-center py-2">No existe historial para este deportista</td>

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

export default HistoricalMorphological