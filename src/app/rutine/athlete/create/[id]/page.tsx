'use client'
import { gruposMusculares } from '@/libs/gruposMusculares'
import { pechoEjercicios } from '@/utils/ejercicios'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



const RutinePage = () => {

    const navigation = useRouter()
    const athleteID = useParams()

    const [dias, setDias] = useState([1])
    const [isCheckedExercise, setIsCheckedExercise] = useState<any>({
        athlete_id: athleteID.id,
        pe1: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Press de banca" },
        pe2: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Aperturas con mancuernas" },
        pe3: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Press inclinado con mancuernas" },
        pe4: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Fondos en Paralelas" },
        pe5: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Pullover con Mancuernas" },
        pe6: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Press con Mancuernas en Banco Plano" },
        pe7: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Aperturas en Máquina" },
        pe8: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Press de Banca con Agarre Cerrado" },
        pe9: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Cruces de Cables" },
        pe10: { active: false, serie: 2, reps: 8, musculo: "pecho", ejercicio: "Fondos con Peso Adicional" },
        b1: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Curl de Bíceps" },
        b2: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Extensiones de Tríceps en Polea Alta" },
        b3: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Curl Martillo" },
        b4: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Fondos en Paralelas para Tríceps" },
        b5: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Curl de Bíceps en Banco Inclinado" },
        b6: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Extensiones de Tríceps con Mancuerna" },
        b7: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Curl Concentrado" },
        b8: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Curl de Bíceps en Predicador" },
        b9: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Extensiones de Tríceps en Banco" },
        b10: { active: false, serie: 2, reps: 8, musculo: "brazos", ejercicio: "Curl de Bíceps con Banda de Resistencia" },
        pi1: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Sentadillas" },
        pi2: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Prensa de Piernas" },
        pi3: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Extensiones de Piernas" },
        pi4: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Curl de Piernas" },
        pi5: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Elevaciones de Talones" },
        pi6: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Sentadillas Frontales" },
        pi7: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Zancadas" },
        pi8: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Peso Muerto Romeno" },
        pi9: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Extensiones de Cadera en Máquina" },
        pi10: { active: false, serie: 2, reps: 8, musculo: "piernas", ejercicio: "Sentadilla Búlgara" },
        e1: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Dominadas" },
        e2: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Remo con Barra" },
        e3: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Jalón al Pecho" },
        e4: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Remo con Mancuernas" },
        e5: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Hiperextensiones" },
        e6: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Pull-over con Barra" },
        e7: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Jalón con Agarre en Pronación" },
        e8: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Remo en Máquina" },
        e9: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Remo con Bandas de Resistencia" },
        e10: { active: false, serie: 2, reps: 8, musculo: "espalda", ejercicio: "Remo a una Mano en Banco" },
        h1: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Press Militar" },
        h2: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Elevaciones Laterales" },
        h3: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Elevaciones Frontales" },
        h4: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Pájaros con Mancuernas" },
        h5: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Remo al Mentón" },
        h6: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Press Arnold" },
        h7: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Elevaciones Posteriores en Máquina" },
        h8: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Elevaciones Laterales con Cables" },
        h9: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Face Pulls" },
        h10: { active: false, serie: 2, reps: 8, musculo: "hombros", ejercicio: "Remo Vertical con Barra" },
        a1: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Crunches" },
        a2: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Elevaciones de Piernas" },
        a3: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Plancha" },
        a4: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Russian Twists" },
        a5: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Toques de Talón" },
        a6: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Crunches en Máquina" },
        a7: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Elevación de Piernas en Barra" },
        a8: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Plancha Lateral" },
        a9: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Mountain Climbers" },
        a10: { active: false, serie: 2, reps: 8, musculo: "abdomen", ejercicio: "Bicicleta" },
        pecho: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false },
        brazos: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false },
        espalda: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false },
        piernas: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false },
        abdomen: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false },
        hombros: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false }
    });


    const handleButtonClick = (item: any) => {
        setIsCheckedExercise((prevState: any) => ({
            ...prevState,
            [item.id]: {
                ...prevState[item.id],
                active: !prevState[item.id].active
            }
        }));
    }
    const handleOnChangeReps = (value: string, item: any) => {
        console.log(value)
        setIsCheckedExercise((prevState: any) => ({
            ...prevState,
            [item.id]: {
                ...prevState[item.id],
                reps: parseInt(value)
            }
        }));
    }
    const handleOnChangeSeries = (value: string, item: any) => {
        console.log(value)
        setIsCheckedExercise((prevState: any) => ({
            ...prevState,
            [item.id]: {
                ...prevState[item.id],
                serie: parseInt(value)
            }
        }));

    }
    const handleOnChangeDayByMuscle = (musculo: string, day: string, value: boolean) => {

        switch (day) {
            case "lunes":
                setIsCheckedExercise((prevState: any) => ({
                    ...prevState,
                    [musculo]: {
                        ...prevState[musculo],
                        [day]: !isCheckedExercise[musculo].lunes
                    }
                }));
                break;
            case "martes":
                setIsCheckedExercise((prevState: any) => ({
                    ...prevState,
                    [musculo]: {
                        ...prevState[musculo],
                        [day]: !isCheckedExercise[musculo].martes
                    }
                }));
                break;
            case "miercoles":
                setIsCheckedExercise((prevState: any) => ({
                    ...prevState,
                    [musculo]: {
                        ...prevState[musculo],
                        [day]: !isCheckedExercise[musculo].miercoles
                    }
                }));
                break;
            case "jueves":
                setIsCheckedExercise((prevState: any) => ({
                    ...prevState,
                    [musculo]: {
                        ...prevState[musculo],
                        [day]: !isCheckedExercise[musculo].jueves
                    }
                }));
                break;
            case "viernes":
                setIsCheckedExercise((prevState: any) => ({
                    ...prevState,
                    [musculo]: {
                        ...prevState[musculo],
                        [day]: !isCheckedExercise[musculo].viernes
                    }
                }));
                break;
            case "sabado":
                setIsCheckedExercise((prevState: any) => ({
                    ...prevState,
                    [musculo]: {
                        ...prevState[musculo],
                        [day]: !isCheckedExercise[musculo].sabado
                    }
                }));
                break;
            default:
                break;
        }

    }

    const handleSubmit = async () => {

        try {
            const res = await axios.post('/api/auth/rutine/create', isCheckedExercise)
            toast.success("Registro de rutina exitoso")
            navigation.push(`/athletes/view/${athleteID.id}`)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
            }
        }
    }



    return (
        <div className='w-full h-screen'>
            <div className="container w-full mx-auto py-4 text-slate-900">

                {/* header */}
                <div className=' bg-slate-800 py-2 mb-2 px-4 col-span-4 flex gap-4 items-center justify-between '>
                    <button
                        type='button'
                        onClick={() => navigation.push(`/rutine/athlete/view/${athleteID.id}`)}
                        className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
                    >
                        Volver
                    </button>
                </div>
                {/* header */}

                <div className=' bg-slate-200 items-center justify-center'>
                    {dias.map<any>((dia: any) => {

                        return (
                            <div key={dia}>
                                {/* Dia */}
                                <div className=' text-slate-100 p-2 grid grid-cols-6'>
                                    <div className='bg-slate-900 text-slate-100 text-center col-span-6'>
                                        Selecciona los ejercicios
                                    </div>


                                    {gruposMusculares.map<any>((g: any) => {
                                        return (
                                            // Grupo muscular 
                                            <div className=' text-slate-900 h-full grid grid-cols-1 py-2 px-1 bg-slate-300 ' key={g.grupo}>
                                                <div className='col-span-1 h-8 px-2 bg-slate-700 text-slate-100'>
                                                    <div className='flex gap-2 items-center w-full h-full justify-center'>
                                                        <span className='capitalize'>{g.grupo}</span>
                                                    </div>
                                                </div>
                                                <div className='col-span-1'>
                                                    <div className='grid ' >
                                                        {pechoEjercicios.map<any>((item: any) => {
                                                            if (g.grupo === item.musculo) {
                                                                return (
                                                                    // aqui
                                                                    <div
                                                                        className={isCheckedExercise[item.id] && isCheckedExercise[item.id].active
                                                                            ? 'grid grid-cols-6 border-b-2 border-r-2 border-l-2 h-14 items-center border-slate-400 bg-green-500 p-2 gap-2 py-2 text-xs'
                                                                            : 'grid grid-cols-6 border-b-2  h-14 items-center border-slate-300 bg-slate-400 p-2 gap-2 py-2 text-xs'
                                                                        }
                                                                        key={Math.random()}
                                                                    >
                                                                        <div className={isCheckedExercise[item.id] ? "col-span-4 flex" : 'col-span-6 flex '}>
                                                                            <button onClick={() => handleButtonClick(item)} className='px-2 w-full cursor-pointer text-left'>{item.ejercicio}</button>
                                                                        </div>
                                                                        <div className={isCheckedExercise[item.id] && isCheckedExercise[item.id].active ? "col-span-2 justify-end gap-2" : 'hidden'}>
                                                                            <div className='flex gap-2'>
                                                                                <div className='flex gap-1 items-center '>
                                                                                    <select
                                                                                        onChange={(e) => handleOnChangeSeries(e.target.value, item)}
                                                                                        value={isCheckedExercise[item.id]?.serie || ''}

                                                                                    >
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className='flex gap-1 items-center'>
                                                                                    <select
                                                                                        onChange={(e) => handleOnChangeReps(e.target.value, item)}
                                                                                        value={isCheckedExercise[item.id]?.reps || ''}
                                                                                    >
                                                                                        <option value="8" >8</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="12">12</option>
                                                                                        <option value="15">15</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                                <div className='bg-slate-900  p-2'>
                                                    <div className='grid grid-cols-6 text-xs text-slate-100'>
                                                        <div className='grid justify-center gap-1'>
                                                            <label>Lun</label>
                                                            <input
                                                                type="checkbox"
                                                                className='appearance-none h-3 w-3 cursor-pointer checked:bg-green-600 mx-auto bg-gray-200'
                                                                onChange={(e) => handleOnChangeDayByMuscle(g.grupo, "lunes", e.target.checked)}
                                                                checked={isCheckedExercise[g.grupo]?.lunes ?? false}
                                                            />
                                                        </div>
                                                        <div className='grid justify-center gap-1'>
                                                            <label>Mar</label>
                                                            <input
                                                                type="checkbox"
                                                                className='appearance-none h-3 w-3 cursor-pointer checked:bg-green-600 mx-auto bg-gray-200'
                                                                onChange={(e) => handleOnChangeDayByMuscle(g.grupo, "martes", e.target.checked)}
                                                                checked={isCheckedExercise[g.grupo]?.martes ?? false}
                                                            />
                                                        </div>
                                                        <div className='grid justify-center gap-1'>
                                                            <label>Mie</label>
                                                            <input
                                                                type="checkbox"
                                                                className='appearance-none h-3 w-3 cursor-pointer checked:bg-green-600 mx-auto bg-gray-200'
                                                                onChange={(e) => handleOnChangeDayByMuscle(g.grupo, "miercoles", e.target.checked)}
                                                                checked={isCheckedExercise[g.grupo]?.miercoles ?? false}
                                                            />
                                                        </div>
                                                        <div className='grid justify-center gap-1'>
                                                            <label>Jue</label>
                                                            <input
                                                                type="checkbox"
                                                                className='appearance-none h-3 w-3 cursor-pointer checked:bg-green-600 mx-auto bg-gray-200'
                                                                onChange={(e) => handleOnChangeDayByMuscle(g.grupo, "jueves", e.target.checked)}
                                                                checked={isCheckedExercise[g.grupo]?.jueves ?? false}
                                                            />
                                                        </div>
                                                        <div className='grid justify-center gap-1'>
                                                            <label>Vie</label>
                                                            <input
                                                                type="checkbox"
                                                                className='appearance-none h-3 w-3 cursor-pointer checked:bg-green-600 mx-auto bg-gray-200'
                                                                onChange={(e) => handleOnChangeDayByMuscle(g.grupo, "viernes", e.target.checked)}
                                                                checked={isCheckedExercise[g.grupo]?.viernes ?? false}
                                                            />
                                                        </div>
                                                        <div className='grid justify-center gap-1'>
                                                            <label>Sab</label>
                                                            <input
                                                                type="checkbox"
                                                                className='appearance-none h-3 cursor-pointer w-3 checked:bg-green-600 mx-auto bg-gray-200'
                                                                onChange={(e) => handleOnChangeDayByMuscle(g.grupo, "sabado", e.target.checked)}
                                                                checked={isCheckedExercise[g.grupo]?.sabado ?? false}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            //Musculo 
                                        )

                                    })}




                                </div>
                                {/* Dia */}
                            </div>
                        )

                    })}

                    {/* map */}

                </div>


                {/* Agregar */}

                <div className='bg-slate-200 p-2 flex justify-end px-2 '>
                    <button className='bg-green-600 px-4 py-1 text-white' onClick={handleSubmit}>
                        Registrar rutina
                    </button>
                </div>



            </div>
        </div >
    )
}

export default RutinePage