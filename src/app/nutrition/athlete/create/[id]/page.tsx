'use client'
import { useState } from 'react'
import { MdFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";
import { PiOrangeFill } from "react-icons/pi";
import { BiSolidDish } from "react-icons/bi";
import { useParams, useRouter } from 'next/navigation';
import { FaPlus } from "react-icons/fa";



const CreateNutrition = () => {

    const navigation = useRouter();
    const athleteID = useParams();

    const [dias, setDias] = useState([
        {
            dia: "lunes",
            bg: "bg-red-700",
            text: "text-red-700",
            border: "border-red-700"
        },
        {
            dia: "martes",
            bg: "bg-green-700",
            text: "text-green-700",
            border: "border-green-700"
        },
        {
            dia: "miércoles",
            bg: "bg-cyan-700",
            text: "text-cyan-700",
            border: "border-cyan-700"
        },
        {
            dia: "jueves",
            bg: "bg-gray-800",
            text: "text-gray-800",
            border: "border-gray-800"
        },
        {
            dia: "viernes",
            bg: "bg-pink-700",
            text: "text-pink-700",
            border: "border-pink-700"
        },
        {
            dia: "sábado",
            bg: "bg-blue-900",
            text: "text-blue-900",
            border: "border-blue-900"
        }


    ])
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

                    </div>

                </div>
                {/* header */}

                <h2 className='text-center py-2 text-xl bg-slate-800 text-slate-100 my-3'>Diseña el plan nutricional</h2>
                <div className='grid grid-cols-6 gap-3'>





                    {dias.map((item: any) => {
                        return (
                            <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md ${item.border} `} key={item.dia}>
                                <div className={`py-2 mb-5 text-center text-slate-100 uppercase ${item.bg}`}>
                                    {item.dia}
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text} `}>
                                            <MdFreeBreakfast className='text-2xl' />
                                            Desayuno</span>
                                    </div>
                                    <textarea className={`w-full py-1 my-2 px-1 border ${item.border}`}></textarea>
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>

                                            <FaBowlFood className='text-2xl' />
                                            Merienda</span>
                                    </div>
                                    <textarea className={`w-full py-1 my-2 px-1 border ${item.border}`}></textarea>
                                </div>

                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>

                                            <MdDinnerDining className='text-2xl' />
                                            Almuerzo
                                        </span>
                                    </div>
                                    <textarea className={`w-full py-1 my-2 px-1  border ${item.border}`}></textarea>
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>
                                            <PiOrangeFill className='text-2xl' />
                                            Snack
                                        </span>
                                    </div>
                                    <textarea className={`w-full py-1 my-2 px-1 border ${item.border}`}></textarea>
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>
                                            <BiSolidDish className='text-2xl' />
                                            Cena
                                        </span>
                                    </div>
                                    <textarea className={`w-full py-1 my-2 px-1 border  ${item.border}`}>

                                    </textarea>



                                </div>
                            </div>
                        )
                    })}










                    <div className='col-span-6 flex justify-end'>
                        <button className='bg-green-500 text-slate-100  px-4 py-1 rounded-md'>Registrar</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default CreateNutrition