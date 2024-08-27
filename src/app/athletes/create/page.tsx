'use client'
import { addathleteSchema } from '@/validations/addathleteSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateAthlete = () => {
    const [cantones, setCantones] = useState([]);
    const [selectedCanton, setSelectedCanton] = useState("1");
    const [distritos, setDistritos] = useState([]);
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState("1")
    const [modalitiesSports, setModalitiesSports] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useRouter();


    type Inputs = {
        identification: string;
        name: string;
        lastname1: string;
        lastname2: string;
        birth: string;
        genre: string;
        email: string;
        phone: string;
        provincia_id: string;
        canton_id: string;
        distrito_id: string;
        sport_id: string;
        modality_id: string;
        intensity: string;
        height: string;
        weight: string;
        IMC: string;
        fat: string;
        muscle: string;
        water: string;
        waist: string;
        hip: string;
        aright: string;
        aleft: string;
        lright: string;
        lleft: string;
        gright: string;
        gleft: string;
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(addathleteSchema),
    });


    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/cantones/`)
                setCantones(res.data.cantonesData)
                const respose = await axios.get(`/api/auth/sports/`)
                setSports(respose.data.sportsData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/distritos/${selectedCanton}`)
                setDistritos(res.data.distritosData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [selectedCanton])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/sports/${selectedSport}`)
                setModalitiesSports(res.data.modalitiesData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [selectedSport])

    const onInvalid = () => console.log(errors)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        const { identification, name, lastname1, lastname2, email, birth, genre, phone, provincia_id, distrito_id, canton_id, sport_id, modality_id, intensity, height, weight, IMC, fat, muscle, water, waist, hip, aright, aleft, lright, lleft, gright, gleft } = data;



        const athleteForm = {
            identification,
            name,
            lastname1,
            lastname2,
            email,
            password: "atleta",
            role: "atleta",
            birth,
            genre,
            phone,
            address: { provincia_id, canton_id, distrito_id },
            activity: { sport_id, modality_id, intensity },
            active: true,
        }

        const morphologicalForm = {
            athlete_id: identification,
            basic: { height, weight, IMC },
            percentage: { fat, muscle, water },
            circumference: { waist, hip },
            arms: { aright, aleft },
            legs: { lright, lleft },
            gastrocnemius: { gright, gleft },
            active: true,
        }


        try {
            const res = await axios.post("/api/auth/athletes/create", athleteForm)
            const response = await axios.post("/api/auth/athletes/create/morphological", morphologicalForm)
            reset();
            toast.success('Deportista registrado correctamente');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error?.response?.data.message)
                toast.error('Este número de identificación ya existe en la base de datos');
            }
        }
        setIsLoading(false);
    }

    return (
        <div className='w-full h-screen'>
            <div className="container w-full mx-auto py-4 text-slate-900">

                {/* header */}
                <div className=' bg-slate-800 py-2 mb-2 px-4 col-span-4 flex gap-4 items-center justify-between '>
                    <button
                        type='button'
                        onClick={() => navigation.push(`/athletes`)}
                        className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
                    >
                        Volver
                    </button>
                </div>
                {/* header */}


                <form
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    className='grid grid-cols-4 gap-4 w-full text-sm'
                >
                    {/* Datos personales*/}
                    <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-2'>
                        <div className='bg-slate-800'>
                            <h2 className='text-slate-100 w-full mx-4'>Datos personales</h2>
                        </div>

                        <div className='py-1 grid grid-cols-3 gap-4 w-full '>
                            <div className='grid gap-1'>
                                <label >Identificación</label>
                                <input
                                    type="number"
                                    className={errors.identification ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('identification')}
                                />
                            </div>
                            <div className='grid gap-1'>
                                <label>Fecha Nacimiento</label>
                                <input
                                    type="date"
                                    className={errors.birth ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('birth')}
                                />
                            </div>
                            <div className='grid gap-1'>
                                <label >Género</label>
                                <select
                                    className={errors.identification ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                    {...register('genre')}
                                >
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>
                        </div>
                        <div className='py-1 grid grid-cols-3 gap-4 w-full '>
                            <div className='grid gap-1'>
                                <label >Nombre</label>
                                <input
                                    type="text"
                                    className={errors.name ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('name')}
                                />
                            </div>
                            <div className='grid gap-1'>
                                <label>Primer Apellido</label>
                                <input
                                    type="text"
                                    className={errors.lastname1 ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('lastname1')}
                                />
                            </div>
                            <div className='grid gap-1'>
                                <label >Segundo Apellido</label>
                                <input
                                    type="text"
                                    className={errors.lastname2 ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('lastname2')}
                                />
                            </div>
                        </div>
                        <div className='py-1 grid grid-cols-3 gap-4 w-full'>
                            <div className='grid gap-1 col-span-2'>
                                <label >Correo electrónico</label>
                                <input
                                    type="text"
                                    className={errors.email ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('email')}
                                />
                            </div>
                            <div className='grid gap-1 col-span-1'>
                                <label>Teléfono</label>
                                <input
                                    type="number"
                                    className={errors.phone ? 'w-full px-2 border border-red-600' : 'w-full px-2'}
                                    {...register('phone')}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Datos personales*/}

                    {/* Ubicación */}
                    <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-1'>
                        <div className='bg-slate-800'>
                            <h2 className='text-slate-100 w-full mx-4'>Datos Demográficos</h2>
                        </div>
                        <div className='grid gap-5 py-5'>
                            <div className=' grid w-full'>
                                <div className='grid grid-cols-4 gap-2 '>
                                    <label className='col-span-1'>Provincia</label>
                                    <select
                                        className={errors.provincia_id ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                        {...register('provincia_id')}
                                    >
                                        <option value="limon">Limón</option>
                                    </select>
                                    {errors.provincia_id?.message && <p className="text-red-700 text-xs">{errors.provincia_id?.message}</p>}

                                </div>
                            </div>
                            <div className='grid w-full'>
                                <div className='grid grid-cols-4 gap-2 '>
                                    <label className='col-span-1'>Cantón</label>
                                    <select
                                        className={errors.canton_id ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                        {...register('canton_id', {
                                            onChange: e => {
                                                setSelectedCanton(e.target.value);
                                            }
                                        })}
                                    >
                                        {cantones.map<any>((item: any) => {
                                            return <option key={item.id} value={item.id}>{item.nombre}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className=' grid w-full'>
                                <div className='grid grid-cols-4 gap-2 '>
                                    <label className='col-span-1'>Distrito</label>
                                    <select
                                        className={errors.distrito_id ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                        {...register('distrito_id')}
                                    >
                                        {distritos.map<any>((item: any) => {
                                            return <option key={item.id} value={item.id}>{item.nombre}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Ubicación */}

                    {/* Deportes */}
                    <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-1'>
                        <div className='bg-slate-800'>
                            <h2 className='text-slate-100 w-full mx-4'>Actividad física</h2>
                        </div>

                        <div className='grid gap-5 py-5'>
                            <div className=' grid w-full'>
                                <div className='grid grid-cols-4 gap-2 '>
                                    <label className='col-span-1'>Deporte</label>
                                    <select
                                        className={errors.sport_id ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                        {...register('sport_id', {
                                            onChange: e => {
                                                setSelectedSport(e.target.value);
                                            }
                                        })}
                                    >
                                        {sports.map<any>((item: any) => {
                                            return <option key={item._id} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='grid w-full'>
                                <div className='grid grid-cols-4 gap-2 '>
                                    <label className='col-span-1'>Modalidad</label>
                                    <select
                                        className={errors.modality_id ? 'w-full col-span-3 px-2 capitalize border border-red-600' : 'w-full col-span-3 px-2 capitalize'}
                                        {...register('modality_id')}
                                    >
                                        {modalitiesSports.map<any>((item: any) => {
                                            return <option key={item.id} value={item.id} className='capitalize'>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className=' grid w-full'>
                                <div className='grid grid-cols-4 gap-2 '>
                                    <label className='col-span-1'>Intensidad</label>
                                    <select
                                        className={errors.intensity ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                        {...register('intensity')}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Deportes */}



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
                                                <input
                                                    type="number"
                                                    className={errors.height ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('height')}
                                                />
                                                <p>cm</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Peso</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.weight ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('weight')}
                                                />
                                                <p>kl</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>IMC</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.IMC ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('IMC')}
                                                />
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
                                                <input
                                                    type="number"
                                                    className={errors.fat ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('fat')}
                                                />
                                                <span>%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Musculo</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.muscle ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('muscle')}
                                                />
                                                <span>%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Agua</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.water ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('water')}
                                                />
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
                                                <input
                                                    type="number"
                                                    className={errors.waist ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('waist')}
                                                />
                                                <span>cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Cadera</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.hip ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('hip')}
                                                />
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
                                                <input
                                                    type="number"
                                                    className={errors.aright ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('aright')}
                                                />
                                                <span>cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Izquierdo</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.aleft ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('aleft')}
                                                />
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
                                                <input
                                                    type="number"
                                                    className={errors.lright ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('lright')}
                                                />
                                                <span>cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Izquierda</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.lleft ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('lleft')}
                                                />
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
                                                <input
                                                    type="number"
                                                    className={errors.gright ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('gright')}
                                                />
                                                <span>cm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <label className='col-span-1'>Izquierdo</label>
                                            <div className='grid grid-cols-2'>
                                                <input
                                                    type="number"
                                                    className={errors.gleft ? 'w-8 text-center border border-red-600' : 'w-8 text-center'}
                                                    {...register('gleft')}
                                                />
                                                <span>cm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* gastrocnemio */}
                            <div className=' bg-slate-100 p-4 col-span-6 flex gap-4 items-center justify-end'>
                                {/* <button
                                    type='button'
                                    onClick={() => navigation.push('/athletes')}
                                    className={isLoading ? 'px-4 py-2 bg-gray-300 text-slate-100 rounded-2xl' : 'px-4 py-2 bg-slate-400 shadow-md text-slate-100 rounded-2xl'}
                                    disabled={isLoading}>
                                    Volver
                                </button> */}
                                <button
                                    type='submit'
                                    className={isLoading ? 'px-4 py-2 bg-gray-300 text-slate-100 rounded-2xl' : 'px-4 py-2 shadow-md bg-green-500 text-slate-100 rounded-2xl'}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Cargando..." : "Registrar"}
                                </button>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default CreateAthlete