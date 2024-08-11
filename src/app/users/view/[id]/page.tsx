'use client'
import DateTableUser from '@/app/components/dates/table/user/page';
import calcularEdad from '@/hooks/calculateAge';
import axios, { AxiosError } from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { RiEditBoxFill } from "react-icons/ri";

const ViewUser = () => {
  const [user, setUser] = useState<any>();

  const [cantonDataByID, setCantonDataByID] = useState<any>();
  const [distritoDataByID, setDistritoDataByID] = useState<any>();

  const navigation = useRouter();
  const searchParams = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/auth/users/view/${searchParams.id}`)
        setUser(res.data.userData[0])
      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [searchParams])


  useEffect(() => {

    async function fetchData() {
      try {
        const resCanton = await axios.get(`/api/auth/cantones/view/${user?.address?.canton_id}`)
        setCantonDataByID(resCanton.data.cantonDataByID[0]);
        const resDistrito = await axios.get(`/api/auth/distritos/view/${user?.address?.distrito_id}`)
        setDistritoDataByID(resDistrito.data.distritoDataByID[0]);
      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    }
    if (user?.address) {
      fetchData()
    }
  }, [user])


  return (


    <div className='w-full h-screen'>

      <div className="container w-full mx-auto py-4 text-slate-900">
        <div
          className='grid grid-cols-4 gap-4 w-full text-sm'
        >
          {/* header */}
          <div className=' bg-slate-800 py-2 px-4 col-span-4 flex gap-4 items-center justify-between '>
            <button
              type='button'
              onClick={() => navigation.push('/users')}
              className=" flex items-center gap-1 bg-slate-200 py-1 px-2 text-slate-90 rounded-md md:col-span-1 text-center "
            >
              Volver
            </button>
            <div className='flex items-center gap-2'>

              <button
                className=" flex items-center gap-1 bg-orange-500 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
              >
                <RiEditBoxFill className='text-slate-100 text-md' />
                <span className='text-md'>
                  Editar
                </span>
              </button>
              <button
                className=" flex items-center  bg-red-600 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
              >
                Desactivar
              </button>
            </div>
          </div>
          {/* header */}

          {/* Datos personales*/}
          <div className='w-full bg-slate-200 p-4 col-span-4 md:col-span-2'>
            <div className='bg-slate-800'>
              <h2 className='text-slate-100 w-full mx-4'>Datos personales</h2>
            </div>

            <div className='py-1 grid grid-cols-3 gap-4 w-full '>
              <div className='grid gap-1'>
                <label >Identificación</label>
                <span className='w-full px-2 bg-slate-100'>{user?.identification || "Cargando"}</span>

              </div>
              <div className='grid gap-1'>
                <label>Edad</label>
                <span className='w-full px-2 bg-slate-100'>{user?.birth && calcularEdad(`${user?.birth}`)}</span>
              </div>
              <div className='grid gap-1'>
                <label >Especialidad</label>
                <span className='w-full col-span-3 px-2 bg-slate-100 capitalize'>{user?.role || "Cargando"}</span>
              </div>
            </div>
            <div className='py-1 grid grid-cols-3 gap-4 w-full '>
              <div className='grid gap-1'>
                <label >Nombre</label>
                <span className='w-full px-2 bg-slate-100'>{user?.name || "Cargando"}</span>

              </div>
              <div className='grid gap-1'>
                <label>Primer Apellido</label>
                <span className='w-full px-2 bg-slate-100'>{user?.lastname1 || "Cargando"}</span>
              </div>
              <div className='grid gap-1'>
                <label >Segundo Apellido</label>
                <span className='w-full px-2 bg-slate-100'>{user?.lastname2 || "Cargando"}</span>
              </div>
            </div>
            <div className='py-1 grid grid-cols-3 gap-4 w-full'>
              <div className='grid gap-1 col-span-2'>
                <label >Correo electrónico</label>
                <span className='w-full px-2 bg-slate-100'>{user?.email || "Cargando"}</span>
              </div>
              <div className='grid gap-1 col-span-1'>
                <label>Teléfono</label>
                <span className='w-full px-2 bg-slate-100'>{user?.phone || "Cargando"}</span>
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
                    <span className='w-full col-span-3 px-2 bg-slate-100 capitalize'>{user?.address.provincia_id || "Cargando"}</span>

                  </div>
                </div>
                <div className='grid w-full'>
                  <div className='grid grid-cols-4 gap-2 '>
                    <label className='col-span-1'>Cantón</label>
                    <span className='w-full col-span-3 px-2 bg-slate-100'>{cantonDataByID?.nombre || "Cargando..."}</span>

                  </div>
                </div>
                <div className=' grid w-full'>
                  <div className='grid grid-cols-4 gap-2 '>
                    <label className='col-span-1'>Distrito</label>
                    <span className='w-full col-span-3 px-2 bg-slate-100'>{distritoDataByID?.nombre || "Cargando..."}</span>
                  </div>
                </div>
              </div>
              <div className='grid col-span-1'>
                <span className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg'>{user?.address.description || "Cargando..."}</span>
              </div>
            </div>
          </div>
          {/* Ubicación */}


          {/* Morfologia */}
          <div className='w-full bg-slate-200 p-4 col-span-4'>

            <div className='grid md:grid-cols-6 gap-2 '>



              {/* <div className=' bg-slate-100 p-4 col-span-6 flex gap-4 items-center justify-end'>
                <button
                  className=" flex items-center gap-1 bg-red-600 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
                >
                  Desactivar
                </button>
              </div> */}
            </div>
          </div>



        </div>

        <DateTableUser />

      </div>


    </div >


  )
}

export default ViewUser