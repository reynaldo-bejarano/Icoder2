'use client'
import calcularEdad from '@/hooks/calculateAge';
import { addMedicalSchema } from '@/validations/addMedicalSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


type Inputs = {
  area: string;
  tipo: string;
  grado: string;
  especificacion: string;
  recuperacion: string;
  anotacion: string;
  recomendacion: string;
};

const MedicalPage = () => {
  const { data: session } = useSession<any>();

  useEffect(() => {
    if (session?.user?.role === "nutrición") {
      navigation.push("/")
    }
    if (session?.user?.role === "entrenador") {
      navigation.push("/")
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(addMedicalSchema),
  });

  const [athlete, setAthlete] = useState<any>();
  const [sportDataByID, setSportDataByID] = useState<any>();
  const [modalityDataByID, setModalityDataByID] = useState<any>();
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useRouter();
  const searchParams = useParams()


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/auth/athletes/view/${searchParams.id}`)
        setAthlete(res.data.athleteData[0])

      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [searchParams])

  useEffect(() => {

    async function fetchData() {
      try {
        const resSport = await axios.get(`/api/auth/sports/view/${athlete?.activity?.sport_id}`)
        setSportDataByID(resSport.data.sportDataByID[0]);
        const resActivity = await axios.get(`/api/auth/sports/modalities/${athlete?.activity?.modality_id}`)
        setModalityDataByID(resActivity.data.modalityDataByID[0]);
      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    }
    if (athlete?.activity) {
      fetchData()
    }
  }, [athlete])




  const onInvalid = () => console.log(errors)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    const { area, tipo, grado, especificacion, recuperacion, anotacion, recomendacion } = data;

    const medicalForm = {
      athlete: { identification: athlete?.identification, name: athlete?.name, lastname1: athlete?.lastname1, lastname2: athlete?.lastname2, genre: athlete?.genre, birth: athlete?.birth },
      doctor: { identification: session?.user?.identification, name: session?.user?.name, lastname1: session?.user?.lastname1, lastname2: session?.user?.lastname2 },
      lesion: { area, tipo, grado, especificacion, recuperacion, anotacion, recomendacion },
      sport: { name: sportDataByID?.name, modality: modalityDataByID?.name },
      active: true,
    }

    try {
      const res = await axios.post("/api/auth/medical/create", medicalForm)
      reset();
      toast.success('Reporte médico registrado correctamente');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Error');
      }
    }
    setIsLoading(false);
  }



  return (
    <div className='w-full h-screen'>

      <div className="container w-full mx-auto py-4 text-slate-900">

        {/* header */}
        <div className=' bg-slate-800 py-2 px-4 col-span-4 flex gap-4 items-center justify-between mb-2'>
          <button
            type='button'
            onClick={() => navigation.push(`/medical/athlete/view/${searchParams.id}`)}
            className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
          >
            Volver
          </button>
        </div>
        {/* header */}


        <div
          className='grid grid-cols-4 gap-4 w-full text-sm'
        >
          {/* Datos personales*/}
          <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-2'>
            <div className='bg-slate-800'>
              <h2 className='text-slate-100 w-full mx-4'>Datos personales</h2>
            </div>
            <div className='py-4 grid grid-cols-3 gap-4 w-full '>
              <div className='grid gap-1'>
                <label >Identificación</label>
                <span className='w-full px-2 bg-slate-100 italic'>{athlete?.identification || "Cargando"}</span>
              </div>
              <div className='grid gap-1'>
                <label>Edad</label>
                <span className='w-full px-2 bg-slate-100 italic'>{athlete?.birth && calcularEdad(`${athlete?.birth}`)}</span>
              </div>
              <div className='grid gap-1'>
                <label >Género</label>
                <span className='w-full col-span-3 px-2 bg-slate-100 capitalize italic'>{athlete?.genre || "Cargando"}</span>
              </div>
            </div>
            <div className='py-1 grid grid-cols-3 gap-4 w-full '>
              <div className='grid gap-1'>
                <label >Nombre</label>
                <span className='w-full px-2 bg-slate-100 italic'>{athlete?.name || "Cargando"}</span>
              </div>
              <div className='grid gap-1'>
                <label>Primer Apellido</label>
                <span className='w-full px-2 bg-slate-100 italic'>{athlete?.lastname1 || "Cargando"}</span>
              </div>
              <div className='grid gap-1'>
                <label >Segundo Apellido</label>
                <span className='w-full px-2 bg-slate-100 italic'>{athlete?.lastname2 || "Cargando"}</span>
              </div>
            </div>
          </div>
          {/* Datos personales*/}

          {/* Deporte*/}
          <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-2'>
            <div className='bg-slate-800'>
              <h2 className='text-slate-100 w-full mx-4'>Datos personales</h2>
            </div>
            <div className='grid grid-cols-3 gap-4 w-full py-4'>
              <div className='grid gap-1'>
                <label >Deporte</label>
                <span className='w-full px-2 bg-slate-100 italic capitalize'>{sportDataByID?.name || "Cargando"}</span>
              </div>
              <div className='grid gap-1'>
                <label>Modalidad</label>
                <span className='w-full px-2 bg-slate-100 italic capitalize'>{modalityDataByID?.name || "Cargando..."}</span>
              </div>
              <div className='grid gap-1'>
                <label >Intensidad</label>
                <span className='w-full col-span-3 px-2 bg-slate-100 capitalize italic'>{athlete?.activity.intensity || "Cargando..."}</span>
              </div>
            </div>
          </div>
          {/* Deporte*/}
        </div>




        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className='grid grid-cols-4 gap-4 w-full text-sm py-4'
        >
          {/* Informa Lesion*/}
          <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-4'>
            <div className='bg-slate-800'>
              <h2 className='text-slate-100 w-full mx-4 text-center py-1'>Informe de lesión</h2>
            </div>
            <div className='grid grid-cols-4 gap-10 py-2'>
              <div className='col-span-2'>
                <div className='py-1 grid grid-cols-6 gap-4 w-full '>
                  <div className='grid gap-1 col-span-2'>
                    <label >Área de lesión</label>
                    <select className='w-full px-2 py-1 bg-slate-100 italic' {...register('area')}>
                      <option value="cuello">Cuello</option>
                      <option value="hombros">Hombros</option>
                      <option value="espalda">Espalda</option>
                      <option value="brazos">Brazos</option>
                      <option value="piernas">Piernas</option>
                      <option value="pie">Pie</option>
                    </select>
                  </div>
                  <div className='grid gap-1 col-span-2'>
                    <label>Tipo</label>
                    <input type="text" className='w-full px-2 py-1 bg-slate-100 italic'   {...register('tipo')} />
                  </div>
                  <div className='grid gap-1 col-span-2 '>
                    <label >Grado</label>
                    <input type="text" className='w-full col-span-3 px-2 py-1 bg-slate-100 capitalize italic'  {...register('grado')} />
                  </div>
                  <div className='grid gap-1 col-span-4 '>
                    <label >Especificación</label>
                    <input type="text" className='w-full px-2 py-1 bg-slate-100 italic'  {...register('especificacion')} />
                  </div>
                  <div className='grid gap-1 col-span-2 '>
                    <label >Tiempo de recuperación</label>
                    <input type='text' className='w-full px-2 py-1 bg-slate-100 italic'  {...register('recuperacion')} />
                  </div>
                  <div className='grid gap-1 col-span-6'>
                    <label >Anotaciones</label>
                    <textarea className='w-full h-14 px-2 bg-slate-100 italic'  {...register('anotacion')}></textarea>
                  </div>


                </div>
              </div>
              <div className='col-span-2'>
                <div className='py-1 grid grid-cols-3 gap-4 w-full'>
                  <div className='grid gap-1 col-span-3'>
                    <label >Recomendaciones</label>
                    <textarea className='w-full h-48 px-2 bg-slate-100 italic'  {...register('recomendacion')}></textarea>
                  </div>
                </div>
              </div>

            </div>
            <div className='py-4 bg-slate-200 flex justify-end '>
              <button type='submit' disabled={isLoading} className='bg-green-700 px-4 py-2 rounded-md shadow-lg text-slate-100'>Registrar</button>
            </div>
          </div>
          {/* Informa Lesion*/}
        </form>
        {/* Formulario */}
      </div>
    </div>
  )
}

export default MedicalPage