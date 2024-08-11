'use client'
import { change } from "@/redux/features/statesmodalSlide";
import { changedetailsmodal } from "@/redux/features/userdetailsmodalSlide";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useEffect, useState } from "react";


const ModalDetailsUser = ({ props }: any) => {

    const dispatch = useAppDispatch()
    const [details, setDetails] = useState<any>()


    useEffect(() => {
        async function getData() {
            const res = await axios.get(`/api/auth/users/details/${props}`)
            setDetails(res.data.usersData)
        }
        getData()
    }, [props])


    return (
        <>
            <div className="fixed inset-0">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-75"></div>
                    <div className="hidden sm:inline-block sm:align-middle sm:h-screen"></div>
                    <div className="inline-block align-bottom bg-green-500 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                        <div className="w-full bg-slate-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="w-full sm:flex sm:items-start">

                                <div className="w-full text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left">



                                    <h3 className="text-lg font-medium text-gray-900 ">Datos usuario</h3>
                                    <div className="w-full mt-2 bg-slate-100 p-2 ">

                                        <div
                                            className="grid grid-cols-6 gap-1 w-full">
                                            <div className="col-span-4">
                                                <label className="text-sm text-gray-900" >Rol</label>
                                                <p className="border w-full text-gray-900 px-2 capitalize" >{details ? `${details?.role}` : "Cargando..."}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Identificación</label>
                                                <p className="border w-full text-gray-900 px-2 capitalize" >{details ? `${details?.identification}` : "Cargando..."}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Nombre</label>
                                                <p className="border w-full text-gray-900 px-2 capitalize" >{details ? `${details?.name}` : "Cargando..."}</p>

                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Primer apellido</label>
                                                <p className="border w-full text-gray-900 px-2 capitalize" >{details ? `${details?.lastname1}` : "Cargando..."}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Segundo apellido</label>
                                                <p className="border w-full text-gray-900 px-2 capitalize" >{details ? `${details?.lastname2}` : "Cargando..."}</p>
                                            </div>

                                            <div className="col-span-4">
                                                <label className="text-sm text-gray-900">Correo electrónico</label>
                                                <p className="border w-full text-gray-900 px-2" >{details ? `${details?.email}` : "Cargando..."}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Teléfono</label>
                                                <p className="border w-full text-gray-900 px-2 capitalize" >{details ? `${details?.phone}` : "Cargando..."}</p>
                                            </div>
                                            <div className="w-full col-span-6 flex py-3 bg-slate-50 sm:px-6 sm:flex sm:flex-row-reverse">

                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(changedetailsmodal())}
                                                    className="w-full inline-flex justify-center  rounded-md border border-transparent shadow-md px-4 py-2 bg-red-700 font-medium text-slate-100 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3  sm:w-auto sm:text-sm mt-3">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDetailsUser