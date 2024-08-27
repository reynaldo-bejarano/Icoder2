'use client'
import { useEffect, useState } from 'react'
import { MdFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";
import { PiOrangeFill } from "react-icons/pi";
import { BiSolidDish } from "react-icons/bi";
import { useParams, useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';


const CreateNutrition = () => {
    const { data: session } = useSession<any>();
    const navigation = useRouter();
    const athleteID = useParams();
    const [loading, setLoading] = useState(false)
    let numDays = 0;

    useEffect(() => {
        if (session?.user?.role === "médico") {
            navigation.push("/")
        }
        if (session?.user?.role === "entrenador") {
            navigation.push("/")
        }
        if (session?.user?.role === "terapía física") {
            navigation.push("/")
        }
    })

    const [formulario, setFormulario] = useState<any>({
        athlete_id: athleteID.id,
        1: { day: "lunes", breakfast: "", merienda: "", lunch: "", snack: "", dinner: "" },
        2: { day: "martes", breakfast: "", merienda: "", lunch: "", snack: "", dinner: "" },
        3: { day: "miércoles", breakfast: "", merienda: "", lunch: "", snack: "", dinner: "" },
        4: { day: "jueves", breakfast: "", merienda: "", lunch: "", snack: "", dinner: "" },
        5: { day: "viernes", breakfast: "", merienda: "", lunch: "", snack: "", dinner: "" },
        6: { day: "sábado", breakfast: "", merienda: "", lunch: "", snack: "", dinner: "" },
        active: true,
    });

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

    async function handleOnChangeValue(value: string, day: any, num: number, time: string) {
        switch (day) {
            case "lunes":
                setFormulario((prevState: any) => ({
                    ...prevState,
                    [num]: {
                        ...prevState[num],
                        [time]: value
                    }
                }));
                break;
            case "martes":
                setFormulario((prevState: any) => ({
                    ...prevState,
                    [num]: {
                        ...prevState[num],
                        [time]: value
                    }
                }));
                break;
            case "miércoles":
                setFormulario((prevState: any) => ({
                    ...prevState,
                    [num]: {
                        ...prevState[num],
                        [time]: value
                    }
                }));
                break;
            case "jueves":
                setFormulario((prevState: any) => ({
                    ...prevState,
                    [num]: {
                        ...prevState[num],
                        [time]: value
                    }
                }));
                break;
            case "viernes":
                setFormulario((prevState: any) => ({
                    ...prevState,
                    [num]: {
                        ...prevState[num],
                        [time]: value
                    }
                }));
                break;
            case "sábado":
                setFormulario((prevState: any) => ({
                    ...prevState,
                    [num]: {
                        ...prevState[num],
                        [time]: value
                    }
                }));
                break;
            default:
                break;
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/nutrition/create', formulario)
            toast.success("Registro de plan nutricional exitoso")
            navigation.push(`/athletes/view/${athleteID.id}`)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
            }
        }
        setLoading(false)
    }



    return (
        <div className='w-full h-screen'>

            <div className="container w-full mx-auto py-4 text-slate-900">
                {/* header */}
                <div className=' bg-slate-800 py-2 px-4 mb-4 col-span-4 flex gap-4 items-center justify-between '>
                    <button
                        type='button'
                        onClick={() => navigation.push(`/nutrition/athlete/view/${athleteID.id}`)}
                        className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
                    >
                        Volver
                    </button>

                </div>
                {/* header */}



                <h2 className='text-center py-2 text-xl bg-slate-800 text-slate-100 my-3'>Diseña el plan nutricional</h2>
                <div className='grid grid-cols-6 gap-3'>

                    {dias.map((item: any) => {

                        numDays = numDays + 1;
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
                                    <textarea
                                        id='breakfast'
                                        className={`w-full py-1 my-2 px-1 border ${item.border}`}
                                        onChange={(e) => handleOnChangeValue(e.target.value, item.dia, item.num, "breakfast")}
                                    />
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>

                                            <FaBowlFood className='text-2xl' />
                                            Merienda</span>
                                    </div>
                                    <textarea
                                        className={`w-full py-1 my-2 px-1 border ${item.border}`}
                                        onChange={(e) => handleOnChangeValue(e.target.value, item.dia, item.num, "merienda")} />
                                </div>

                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>

                                            <MdDinnerDining className='text-2xl' />
                                            Almuerzo
                                        </span>
                                    </div>
                                    <textarea
                                        className={`w-full py-1 my-2 px-1 border ${item.border}`}
                                        onChange={(e) => handleOnChangeValue(e.target.value, item.dia, item.num, "lunch")} />
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>
                                            <PiOrangeFill className='text-2xl' />
                                            Snack
                                        </span>
                                    </div>
                                    <textarea
                                        className={`w-full py-1 my-2 px-1 border ${item.border}`}
                                        onChange={(e) => handleOnChangeValue(e.target.value, item.dia, item.num, "snack")} />
                                </div>
                                <div className='px-2'>
                                    <div className='w-full flex '>
                                        <span className={`text-center uppercase font-bold text-sm  flex gap-3 items-center ${item.text}`}>
                                            <BiSolidDish className='text-2xl' />
                                            Cena
                                        </span>
                                    </div>
                                    <textarea
                                        className={`w-full py-1 my-2 px-1 border ${item.border}`}
                                        onChange={(e) => handleOnChangeValue(e.target.value, item.dia, item.num, "dinner")} />
                                </div>
                            </div>
                        )
                    })}
                    <div className='col-span-6 flex justify-end'>
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className={loading ? 'bg-gray-500 text-slate-100  px-4 py-1 rounded-md ' : 'bg-green-500 text-slate-100  px-4 py-1 rounded-md'}>
                            {loading ? "Cargando..." : "Registar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNutrition