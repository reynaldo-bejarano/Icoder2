import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react'

const Metrics = () => {
    const [usersCount, setUsersCount] = useState(0)
    const [athletesCount, setAthletesCount] = useState(0)
    const [profesionsCount, setProfesionsCount] = useState({
        entrenadores: 0,
        fisioterapeutas: 0,
        nutricionistas: 0,
        medicos: 0
    })


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("/api/auth/metrics")
                setUsersCount(res.data.usersCount)
                setAthletesCount(res.data.AthletesCount)
                setProfesionsCount(prevState => ({
                    ...prevState,
                    entrenadores: res.data.entrenadoresCount,
                    fisioterapeutas: res.data.fisioterapeutasCount,
                    nutricionistas: res.data.nutricionistasCount,
                    medicos: res.data.medicosCount
                }))

            } catch (error) {
                if (error instanceof AxiosError) console.log(error)
            }
        }
        fetchData();

    }, [])
    
    return (
        <div className='w-full '>

            <div className='bg-slate-900'>
                <span className='text-slate-200 px-5'>Registros</span>
            </div>

            <div className='grid grid-cols-2 py-5 gap-10 p-5  italic text-sm text-slate-800'>
                <div className=''>
                    <div className='col-span-1 mb-2'>
                        <div className='flex justify-between mb-1'>
                            <span>Total de usuarios registrados</span>
                            <span>{usersCount}</span>
                        </div>
                        <div className='col-span-1 h-[2px] w-full bg-cyan-700'></div>
                    </div>

                    <div className='col-span-1 mb-2'>
                        <div className='flex justify-between mb-1 '>
                            <span>Total de deportistas registrados</span>
                            <span>{athletesCount}</span>
                        </div>
                        <div className='col-span-1 h-[2px] w-full bg-cyan-700'></div>
                    </div>

                </div>
                <div className=''>
                    <div className='col-span-1 mb-2'>
                        <div className='flex justify-between mb-1'>
                            <span>Entrenadores</span>
                            <span>{profesionsCount?.entrenadores}</span>
                        </div>
                        <div className='col-span-1 h-[2px] w-full bg-cyan-700'></div>
                    </div>

                    <div className='col-span-1 mb-2'>
                        <div className='flex justify-between mb-1'>
                            <span>Fisioterapeutas</span>
                            <span>{profesionsCount?.fisioterapeutas}</span>
                        </div>
                        <div className='col-span-1 h-[2px] w-full bg-cyan-700'></div>
                    </div>
                    <div className='col-span-1 mb-2'>
                        <div className='flex justify-between mb-1'>
                            <span>Nutricionistas</span>
                            <span>{profesionsCount?.nutricionistas}</span>
                        </div>
                        <div className='col-span-1 h-[2px] w-full bg-cyan-700'></div>
                    </div>

                    <div className='col-span-1 mb-2'>
                        <div className='flex justify-between mb-1'>
                            <span>Médicos</span>
                            <span>{profesionsCount?.medicos}</span>
                        </div>
                        <div className='col-span-1 h-[2px] w-full bg-cyan-700'></div>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Metrics