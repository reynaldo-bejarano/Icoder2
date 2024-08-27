'use client'
import converterIsoStringToDate from '@/hooks/converterIsoStringToDate';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DateTableUserDashboard = ({ userID }: any) => {
    const [dates, setDates] = useState([]);
  
    //getDates
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/dates/view/dashboard/${userID}`)
                setDates(res.data.getDatesByUser)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (userID !== undefined)
            fetchData()
    }, [userID])

    return (

        <div className="container w-full mx-auto text-xs  p-2">
            <div className="bg-gray-800  text-gray-100 text-center py-2">
                Citas del día
            </div>
            <div className="lg:mt-0 rounded shadow bg-white">
                <table
                    className="w-full text-xs grid"
                >
                    <thead>
                        <tr className="bg-gray-900 grid grid-cols-5 text-center py-1 bg-opacity-100   text-white font-normal">
                            <th className=" col-span-1 text-xs">Estado</th>
                            <th className=" col-span-2 text-xs">Atleta</th>
                            <th className=" col-span-1 text-xs">Fecha</th>
                            <th className=" col-span-1 text-xs">Horario</th>
                        </tr>
                    </thead>
                    <tbody>


                        {dates.length > 0 ? dates.map<any>((item: any) => {
                            return (
                                <tr className="text-slate-900 grid grid-cols-5 italic text-center gap-2 border py-2 capitalize" key={item._id}>
                                    <td className="col-span-1 ">
                                        <span className={item?.active ? "  bg-green-600 px-2 py-1 rounded-md  text-slate-100" : ""}>
                                            {item?.active ? "Activado" : "Desactivado"}
                                        </span>
                                    </td>
                    
                                    <td className="col-span-2 ">{item?.athlete_name}</td>
                                    <td className="col-span-1 ">{item?.date && `${converterIsoStringToDate(item.date)}`}</td>
                                    <td className="col-span-1 ">{item?.time}</td>

                                </tr>
                            )
                        })
                            :
                            <tr className="text-slate-900 grid grid-cols-7 items-center text-left gap-2 border py-2 capitalize">
                                <td className="col-span-7 pl-10 text-center italic">No existen citas registradas para el día de hoy</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default DateTableUserDashboard