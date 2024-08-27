'use client'
import { useEffect, useState } from 'react'
import { MdFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";
import { PiOrangeFill } from "react-icons/pi";
import { BiSolidDish } from "react-icons/bi";
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFNutrition from '../../pdf/nutrition';



const TableNutrition = () => {

    const athleteID = useParams();
    const [formulario, setFormulario] = useState<any>([]);

    const [dias, setDias] = useState([
        {
            num: 1,
            dia: "lunes",
            bg: "bg-slate-800",
            text: "text-slate-800",
            border: "border-slate-800"
        },
        {
            num: 2,
            dia: "martes",
            bg: "bg-slate-800",
            text: "text-slate-800",
            border: "border-slate-800"
        },
        {
            num: 3,
            dia: "miércoles",
            bg: "bg-slate-800",
            text: "text-slate-800",
            border: "border-slate-800"
        },
        {
            num: 4,
            dia: "jueves",
            bg: "bg-gray-800",
            text: "text-gray-800",
            border: "border-gray-800"
        },
        {
            num: 5,
            dia: "viernes",
            bg: "bg-slate-800",
            text: "text-slate-800",
            border: "border-slate-800"
        },
        {
            num: 6,
            dia: "sábado",
            bg: "bg-slate-800",
            text: "text-slate-800",
            border: "border-slate-800"
        }
    ])

    useEffect(() => {

        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/nutrition/view/${athleteID.id}`)
                console.log(res.data.nutritionDataByID[0])
                setFormulario(res.data.nutritionDataByID)
            } catch (error) {
                if (error instanceof AxiosError) console.log(error)
            }
        }

        fetchData();

    }, [athleteID])




    return (
        <div className='w-full h-screen '>

            <div className="container w-full mx-auto text-xs py-4 text-slate-900">

                <div className='text-center  flex gap-2 justify-between px-5 bg-slate-900 text-slate-100 py-1 my-2'>
                    <span className=' text-base text-center'>
                        Plan nutricional
                    </span>
                    <div>
                        <PDFDownloadLink document={<PDFNutrition formularioData={formulario} />} fileName={`plan nutricional ${athleteID.id}.pdf`}>
                            {
                                ({ loading, url, error }) => loading
                                    ? <button className='bg-slate-400 py-1 px-2 text-slate-100  text-center rounded-md text-xs' disabled={true}>Cargando plan</button>
                                    : <button className='bg-slate-400 py-1 px-2 text-slate-100  text-center rounded-md text-xs'>Descargar plan</button>
                            }
                        </PDFDownloadLink>
                    </div>
                </div>

                {
                    formulario.map((i: any) => {

                        return (
                            <div className='grid grid-cols-6 gap-3 text-slate-600' key={Math.random()}>

                                {/* Lunes */}
                                <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md bg-slate-200 text-slate-900 `} >
                                    <div className={`py-2 mb-5 text-center uppercase font-bold bg-slate-800 text-slate-100 `}>
                                        {i[1].day}

                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold  flex gap-3 items-center  `}>
                                                <MdFreeBreakfast className='text-2xl' />
                                                Desayuno </span>
                                        </div>
                                        <textarea
                                            id='breakfast'
                                            className={`w-full py-1 px-8 h-24 capitalize italic `}
                                            value={i[1].breakfast}
                                            disabled={true}
                                        />

                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <FaBowlFood className='text-2xl' />
                                                Merienda  </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[1].merienda}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <MdDinnerDining className='text-2xl' />
                                                Almuerzo
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[1].lunch}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <PiOrangeFill className='text-2xl' />
                                                Snack
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[1].snack}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <BiSolidDish className='text-2xl' />
                                                Cena
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24  capitalize italic  `}
                                            value={i[1].dinner}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {/* Lunes */}

                                {/* Martes */}
                                <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md bg-slate-200 text-slate-900`} >
                                    <div className={`py-2 mb-5 text-center  uppercase font-bold bg-slate-800 text-slate-100 `}>
                                        {i[2].day}
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3`}>
                                                <MdFreeBreakfast className='text-2xl' />
                                                Desayuno </span>
                                        </div>
                                        <textarea
                                            id='breakfast'
                                            className={`w-full py-1  px-8 h-24 capitalize italic`}
                                            value={i[2].breakfast}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>

                                                <FaBowlFood className='text-2xl' />
                                                Merienda  </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[2].merienda}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>

                                                <MdDinnerDining className='text-2xl' />
                                                Almuerzo
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[2].lunch}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>
                                                <PiOrangeFill className='text-2xl' />
                                                Snack
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[2].snack}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2 '>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>
                                                <BiSolidDish className='text-2xl' />
                                                Cena
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24  capitalize italic `}
                                            value={i[2].dinner}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {/* Martes */}

                                {/* Miercoles */}
                                <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md bg-slate-200 text-slate-900`} >
                                    <div className={`py-2 mb-5 text-center  uppercase font-bold bg-slate-800 text-slate-100`}>
                                        {i[3].day}
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <MdFreeBreakfast className='text-2xl' />
                                                Desayuno </span>
                                        </div>
                                        <textarea
                                            id='breakfast'
                                            className={`w-full py-1  px-8 h-24 capitalize italic`}
                                            value={i[3].breakfast}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>

                                                <FaBowlFood className='text-2xl' />
                                                Merienda  </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[3].merienda}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>

                                                <MdDinnerDining className='text-2xl' />
                                                Almuerzo
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[3].lunch}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>
                                                <PiOrangeFill className='text-2xl' />
                                                Snack
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[3].snack}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>
                                                <BiSolidDish className='text-2xl' />
                                                Cena
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24  capitalize italic  `}
                                            value={i[3].dinner}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {/* Miercoles */}

                                {/* Jueves */}
                                <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md bg-slate-200 text-slate-900`} >
                                    <div className={`py-2 mb-5 text-center uppercase font-bold bg-slate-800 text-slate-100 `}>
                                        {i[4].day}
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <MdFreeBreakfast className='text-2xl' />
                                                Desayuno </span>
                                        </div>
                                        <textarea
                                            id='breakfast'
                                            className={`w-full py-1  px-8 h-24 capitalize italic`}
                                            value={i[4].breakfast}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <FaBowlFood className='text-2xl' />
                                                Merienda  </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[4].merienda}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <MdDinnerDining className='text-2xl' />
                                                Almuerzo
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[4].lunch}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <PiOrangeFill className='text-2xl' />
                                                Snack
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[4].snack}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <BiSolidDish className='text-2xl' />
                                                Cena
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24  capitalize italic  `}
                                            value={i[4].dinner}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {/* Jueves */}

                                {/* Viernes */}
                                <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md bg-slate-200 text-slate-900`} >
                                    <div className={`py-2 mb-5 text-center  uppercase font-bold bg-slate-800 text-slate-100`}>
                                        {i[5].day}
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <MdFreeBreakfast className='text-2xl' />
                                                Desayuno </span>
                                        </div>
                                        <textarea
                                            id='breakfast'
                                            className={`w-full py-1  px-8 h-24 capitalize italic`}
                                            value={i[5].breakfast}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <FaBowlFood className='text-2xl' />
                                                Merienda  </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[5].merienda}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <MdDinnerDining className='text-2xl' />
                                                Almuerzo
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[5].lunch}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center`}>
                                                <PiOrangeFill className='text-2xl' />
                                                Snack
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[5].snack}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <BiSolidDish className='text-2xl' />
                                                Cena
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24  capitalize italic  `}
                                            value={i[5].dinner}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {/* Viernes */}

                                {/* sabado */}
                                <div className={`col-span-6 md:col-span-1 border-2  w-full  rounded-md bg-slate-200 text-slate-900 `} >
                                    <div className={`py-2 mb-5 text-center uppercase font-bold bg-slate-800 text-slate-100`}>
                                        {i[6].day}
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold  flex gap-3 items-center  `}>
                                                <MdFreeBreakfast className='text-2xl ' />
                                                Desayuno </span>
                                        </div>
                                        <textarea
                                            id='breakfast'
                                            className={`w-full py-1  px-8 h-24 capitalize italic`}
                                            value={i[6].breakfast}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <FaBowlFood className='text-2xl' />
                                                Merienda  </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[6].merienda}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>

                                                <MdDinnerDining className='text-2xl' />
                                                Almuerzo
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[6].lunch}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold   flex gap-3 items-center `}>
                                                <PiOrangeFill className='text-2xl' />
                                                Snack
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-24 capitalize italic `}
                                            value={i[6].snack}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className='px-2'>
                                        <div className='w-full flex '>
                                            <span className={`text-center uppercase font-bold  flex gap-3 items-center `}>
                                                <BiSolidDish className='text-2xl font' />
                                                Cena
                                            </span>
                                        </div>
                                        <textarea
                                            className={`w-full py-1  px-8 h-20  capitalize italic  `}
                                            value={i[6].dinner}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                {/* sabado */}

                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default TableNutrition