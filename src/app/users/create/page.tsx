'use client'
import { adduserSchema } from '@/validations/adduserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateUser = () => {
    const [cantones, setCantones] = useState([]);
    const [selectedCanton, setSelectedCanton] = useState("1");
    const [distritos, setDistritos] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useRouter();



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(adduserSchema),
    });

    // Cantones
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/auth/cantones/`)
                setCantones(res.data.cantonesData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [])

    // distritos
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

    



    const onInvalid = () => console.log(errors)

    const onSubmit: SubmitHandler<any> = async (data) => {

        // setIsLoading(true)
        const { identification, name, lastname1, lastname2, email, birth, role, phone, provincia_id, distrito_id, canton_id, description } = data;



        const userForm = {
            identification,
            name,
            lastname1,
            lastname2,
            email,
            password: `admin@${identification}`,
            role: role,
            birth,
            phone,
            address: { provincia_id, canton_id, distrito_id, description },
            active: true,
        }

        console.log(useForm)

        try {
            const res = await axios.post("/api/auth/users/create", userForm)
            reset();
            toast.success('Usuario registrado correctamente');
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
                        onClick={() => navigation.push(`/users`)}
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
                                <label >Rol</label>
                                <select
                                    className={errors.role ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                    {...register('role')}
                                >
                                    <option value="entrenador">Entrenador</option>
                                    <option value="terapía física">Físioterapeuta</option>
                                    <option value="médico">Médico</option>
                                    <option value="nutrición">Nutricionista</option>
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
                    <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-2'>
                        <div className='bg-slate-800'>
                            <h2 className='text-slate-100 w-full mx-4'>Datos Demográficos</h2>
                        </div>
                        <div className='grid grid-cols-2 py-5 gap-2'>
                            <div className='grid gap-5 col-span-1'>
                                <div className=' grid w-full'>
                                    <div className='grid grid-cols-4 gap-2 '>
                                        <label className='col-span-1'>Provincia</label>
                                        <select
                                            className={errors.provincia_id ? 'w-full col-span-3 px-2 border border-red-600' : 'w-full col-span-3 px-2'}
                                            {...register('provincia_id')}
                                        >
                                            <option value="limon">Limón</option>
                                        </select>
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
                            <div className='grid col-span-1'>
                                <textarea
                                    className={errors.description
                                        ? 'block p-2.5 w-full text-sm text-gray-900 border border-red-600 bg-gray-50 rounded-lg'
                                        : 'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg'}
                                    placeholder='Dirección exacta'
                                    {...register('description')}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Ubicación */}



                    {/* botones */}
                    <div className='w-full bg-slate-200 p-4 col-span-4'>
                        <div className='grid md:grid-cols-6 gap-2 '>
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

export default CreateUser