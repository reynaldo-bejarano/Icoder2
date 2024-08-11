'use client'
import DateTable from '@/app/components/dates/table/athlete/page';
import Back from '@/app/components/header/button/back/page';
import { citaSchema } from '@/validations/cita';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateDate = () => {

    const [selectedOccupation, setSelectedOccupation] = useState("entrenador")
    const [selectedDate, setSelectedDate] = useState("1950-01-01")

    const [especilistas, setEspecilistas] = useState([]);
    const [times, setTimes] = useState([]);
    const athleteID = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [dateslist, setDateslist] = useState([]);
    const [dates, setDates] = useState([]);
    const [athleteData, setAthleteData] = useState<any>([])
    const navigation = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(citaSchema),
    });

    // AthleteInfo
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/athletes/details/${athleteID.id}`)
                setAthleteData(res.data.athleteData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [athleteID])

    // Profesionals
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/users/search/occupation/${selectedOccupation}`)
                setEspecilistas(res.data.getUserByRole)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [selectedOccupation])

    //dates
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/dates/view/${selectedDate}`)
                setTimes(res.data.filterTime)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [selectedDate])

    // //getDates
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const res = await axios.get(`/api/auth/dates/view/athlete/${athleteID.id}`)
    //             setDates(res.data.getDatesByAthlete)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     fetchData()
    // }, [athleteID])


    // //getDates
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const res = await axios.get(`/api/auth/dates/view/athlete/${athleteID.id}`)
    //             setDates(res.data.getDatesByAthlete)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     fetchData()
    // }, [athleteID])



    const onSubmit: SubmitHandler<any> = async (data) => {

        setIsLoading(true)
        const { user_id, occupation, date, time } = data;
        const splitText = user_id.split("-");
        const athleteName = `${athleteData[0]?.name} ${athleteData[0]?.lastname1} ${athleteData[0]?.lastname2}`

        const citaForm = {
            athlete_id: athleteID.id,
            user_id: splitText[0],
            athlete_name: athleteName,
            occupation,
            specialist: splitText[1],
            date,
            time
        }

        try {
            const res = await axios.post("/api/auth/dates/create", citaForm)
            reset();
            toast.success('Cita registrada correctamente');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error?.response?.data.message)
                toast.error('Este número de identificación ya existe en la base de datos');
            }
        }
        setIsLoading(false);
    }

    const onInvalid = () => console.log(errors)

    return (
        <>
            <div className='w-full h-screen'>

                <Back props={athleteID.id} />

                <div className="container w-full mx-auto py-4 text-slate-900">
                    <form className='w-full bg-slate-200 p-4' onSubmit={handleSubmit(onSubmit, onInvalid)}>
                        <div className='bg-slate-800'>
                            <h2 className='text-slate-100 w-full mx-4'>Registrar cita</h2>
                        </div>

                        <div className=' items-center gap-10 py-5 grid grid-cols-4'>
                            <div className='grid gap-2'>
                                <label >Especialidades</label>
                                <select className='w-full px-2'
                                    {...register('occupation', {
                                        onChange: e => {
                                            setSelectedOccupation(e.target.value);
                                        }
                                    })}
                                    disabled={isLoading}
                                >
                                    <option value="entrenador">Entrenador</option>
                                    <option value="terapía física">Terapía fisica</option>
                                    <option value="nutrición">Nutrición</option>
                                    <option value="médico">Médico</option>
                                </select>
                            </div>
                            <div className='grid gap-2'>
                                <label >Especialista</label>
                                <select className='px-2'  {...register('user_id')} disabled={isLoading}>
                                    {especilistas?.map<any>((item: any) => {
                                        return <option key={item.identification} value={`${item.identification}-${item.name} ${item.lastname1} ${item.lastname2}`}>{item.name} {item.lastname1} {item.lastname2}</option>
                                    })}

                                </select>
                            </div>
                            <div className='grid gap-2'>
                                <label >Fecha</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    {...register('date', {
                                        onChange: e => {
                                            setSelectedDate(e.target.value);
                                        }
                                    })}
                                    className='px-2'
                                />
                            </div>
                            <div className='grid gap-2'>
                                <label >Horario</label>
                                <select className='px-2' disabled={selectedDate === "1950-01-01" || isLoading} {...register('time')}   >
                                    {times.map((item => {
                                        return <option key={item} value={item}>{item}</option>
                                    }))}
                                </select>
                            </div>
                        </div>
                        <div className='w-full flex justify-end'>
                            <button
                                type='submit'
                                className={isLoading ? 'bg-gray-400 px-4 py-1 text-slate-900 rounded-md' : 'bg-green-700 px-4 py-1 text-slate-100 rounded-md'}
                                disabled={isLoading}
                            >
                                {isLoading && "Cargando..." || "Agendar"}
                            </button>
                        </div>

                        {/* tabla */}

                        {/* 
                        <div className="container w-full mx-auto py-10">
                            <div className="bg-gray-800  text-gray-100 text-center">
                            </div>
                            <div className="lg:mt-0 rounded shadow bg-white">
                                <table
                                    className="w-full text-sm grid"
                                >
                                    <thead>
                                        <tr className="bg-gray-900 grid grid-cols-8 text-left  bg-opacity-100 py-2 text-sm text-white font-normal">
                                            <th className="md:pl-10 col-span-1">Estado</th>
                                            <th className="md:pl-10 col-span-1">Especialidad</th>
                                            <th className="md:pl-10 col-span-1">Especialista</th>
                                            <th className="md:pl-10 col-span-2">Atleta</th>
                                            <th className="md:pl-10 col-span-1">Fecha</th>
                                            <th className="md:pl-10 col-span-1">Horario</th>
                                            <th className="md:pl-10 col-span-1">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dates.length > 0 ? dates.map<any>((item: any) => {
                                            return (
                                                <tr className="text-slate-900 grid grid-cols-8 items-center text-left gap-2 border py-2 capitalize" key={item._id}>
                                                    <td className="col-span-1 pl-10">
                                                        <span className={item?.active ? "  bg-green-600 px-2 py-1 rounded-md text-xs text-slate-100" : ""}>
                                                            {item?.active ? "Activado" : "Desactivado"}
                                                        </span>
                                                    </td>
                                                    <td className="col-span-1 pl-10">{item?.occupation}</td>
                                                    <td className="col-span-1 pl-10">{item?.specialist}</td>
                                                    <td className="col-span-2 pl-10">{item?.athlete_name}</td>
                                                    <td className="col-span-1 pl-10">{item?.date && `${converterIsoStringToDate(item.date)}`}</td>
                                                    <td className="col-span-1 pl-10">{item?.time}</td>
                                                    <td className="flex gap-2 items-center justify-center col-span-1">
                                                        <button className="bg-red-600  text-slate-100  px-2 py-1 rounded-md md:col-span-1 text-center text-xs ">
                                                            Cancelar
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            :
                                            <tr className="text-slate-900 grid grid-cols-7 items-center text-left gap-2 border py-2 capitalize">
                                                <td className="col-span-7 pl-10 text-center">No existen citas registradas</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div> */}

                        <DateTable />


                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateDate