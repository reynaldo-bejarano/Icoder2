
import { change } from "@/redux/features/statesmodalSlide";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { adduserSchema } from "@/validations/adduserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const ModalRegisterUser = () => {

    const statusModal = useAppSelector((state) => state.states.value)
    const dispatch = useAppDispatch()
    const router = useRouter()

    type Inputs = {
        identification: string;
        name: string;
        lastname1: string;
        lastname2: string;
        email: string;
        role: string;
        phone: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(adduserSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const dataForm = {
            identification: data.identification,
            name: data.name,
            lastname1: data.lastname1,
            lastname2: data.lastname2,
            email: data.email,
            password: data.role,
            role: data.role,
            phone: data.phone,
        }

        try {
            const res = await axios.post("/api/auth/users", dataForm)
            console.log(res)
            dispatch(change())
            toast.success('Usuario registrado correctamente');
            router.refresh();

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message);
                console.log(error?.response?.data.message)
            }

        }
    }

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
                                    <h3 className="text-lg font-medium text-gray-900">Agregar usuario</h3>
                                    <div className="w-full mt-2 bg-slate-100 p-2 ">

                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="grid grid-cols-6 gap-1 w-full">
                                            <div className="col-span-4">
                                                <label className="text-sm text-gray-900" >Rol</label>

                                                <select className="border w-full text-gray-900" id="cars" {...register('role')}>
                                                    <option value="entrenador" className="text-sm text-gray-900">Entrenador</option>
                                                    <option value="fisioterapeuta" className="text-sm text-gray-900">Fisioterapeuta</option>
                                                    <option value="nutricionista" className="text-sm text-gray-900">Nutricionista</option>
                                                    <option value="medico" className="text-sm text-gray-900">Médico</option>

                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Identificación</label>
                                                <input type="number" className="border w-full text-gray-900" {...register('identification')} />
                                                {errors.identification?.message && <p className="text-red-700 text-xs">{errors.identification?.message}</p>}
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Nombre</label>
                                                <input type="text" className="border w-full text-gray-900" {...register('name')} />
                                                {errors.name?.message && <p className="text-red-700 text-xs">{errors.name?.message}</p>}

                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Primer apellido</label>
                                                <input type="text" className="border w-full text-gray-900" {...register('lastname1')} />
                                                {errors.lastname1?.message && <p className="text-red-700 text-xs">{errors.lastname1?.message}</p>}
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Segundo apellido</label>
                                                <input type="text" className="border w-full text-gray-900" {...register('lastname2')} />
                                                {errors.lastname2?.message && <p className="text-red-700 text-xs">{errors.lastname2?.message}</p>}
                                            </div>

                                            <div className="col-span-4">
                                                <label className="text-sm text-gray-900">Correo electrónico</label>
                                                <input type="email" className="border w-full text-gray-900" {...register('email')} />
                                                {errors.email?.message && <p className="text-red-700 text-xs">{errors.email?.message}</p>}
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-900">Teléfono</label>
                                                <input type="number" className="border w-full text-gray-900" {...register('phone')} />
                                                {errors.phone?.message && <p className="text-red-700 text-xs">{errors.phone?.message}</p>}
                                            </div>
                                            <div className="w-full col-span-6 flex py-3 bg-slate-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="submit"
                                                    className="w-full inline-flex justify-center  rounded-md border border-transparent shadow-md px-4 py-2 bg-green-700 font-medium text-slate-100 hover:bg-gray-50 hover:text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3  sm:w-auto sm:text-sm">Agregar</button>
                                                <button
                                                    onClick={() => dispatch(change())}
                                                    className="w-full inline-flex justify-center  rounded-md border border-transparent shadow-md px-4 py-2 bg-red-700 font-medium text-slate-100 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3  sm:w-auto sm:text-sm mt-3">Cerrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className=" bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                className="w-full inline-flex justify-center  rounded-md border border-transparent shadow-md px-4 py-2 bg-green-700 font-medium text-slate-100 hover:bg-gray-50 hover:text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3  sm:w-auto sm:text-sm">Agregar</button>
                            <button
                                onClick={() => dispatch(change())}
                                className="w-full inline-flex justify-center  rounded-md border border-transparent shadow-md px-4 py-2 bg-red-700 font-medium text-slate-100 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3  sm:w-auto sm:text-sm mt-3">Cerrar</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRegisterUser