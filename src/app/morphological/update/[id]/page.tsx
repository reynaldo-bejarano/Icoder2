'use client'
import { addathleteSchema } from '@/validations/addathleteSchema';
import { addmorphologicalSchema } from '@/validations/addmorphologicalSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CreateAthlete = () => {

    const [isLoading, setIsLoading] = useState(false)
    const navigation = useRouter();
    const morphologicalID = useParams()


    type Inputs = {
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
        resolver: zodResolver(addmorphologicalSchema),
    });



    const onInvalid = () => console.log(errors)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        const { height, weight, IMC, fat, muscle, water, waist, hip, aright, aleft, lright, lleft, gright, gleft } = data;

        const morphologicalForm = {
            basic: { height, weight, IMC },
            percentage: { fat, muscle, water },
            circumference: { waist, hip },
            arms: { aright, aleft },
            legs: { lright, lleft },
            gastrocnemius: { gright, gleft },
            active: true,
            _id: morphologicalID.id
        }


        try {
            const response = await axios.patch("/api/auth/athletes/update/morphological", morphologicalForm)
            reset();
            toast.success('Deportista registrado correctamente');
            navigation.push("/athletes")
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

                                <button
                                    type='submit'
                                    className={isLoading ? 'px-4 py-2 bg-gray-300 text-slate-100 rounded-2xl' : 'px-4 py-2 shadow-md bg-green-500 text-slate-100 rounded-2xl'}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Cargando..." : "Actualizar"}
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