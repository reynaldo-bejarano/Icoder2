"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "@/validations/loginSchema";



function LoginPage() {

    type Inputs = {
        identification: string;
        password: string;
    };

    const { data: session, status } = useSession();
    const [error, setError] = useState("");
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    });


    useEffect(() => {
        if (status === 'authenticated' && session) {
            router.replace('/');
        }

    }, [status, session, router])


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data.identification)
        console.log(data.password)

        const res = await signIn("credentials", {
            identification: data.identification,
            password: data.password,
            redirect: false,
        });

        if (res?.error) console.log(res.error)
        
        if (res?.error) return setError(res.error as string);


        if (res?.ok) return router.push("/dashboard");

    };

    return (
        <>
            {status !== "unauthenticated"
                ?
                <div></div>
                :
                <div className="h-screen bg-gray-100 overflow-hidden">
                    <div className="p-4 px-10  bg-[#002647]">
                        <Image
                            src={"/logoICODER.png"}
                            width={"256"}
                            height={"36"}
                            alt="ICODER Logo"
                        />
                    </div>

                    <div className="flex ">
                        <div className="flex-[70%] pt-40 ">
                            <div className="px-10 leading-loose">
                                {/* <h1 className="font-bold text-6xl  mb-10 text-[#002647]"></h1> */}
                                <p className="font-bold text-4xl my-5 text-gray-700">Centro de entrenamiento y rehabilitación</p>
                                <p className="font-bold text-9xl text-green-900">LIMÓN</p>
                            </div>

                        </div>
                        <div className="flex-[30%] pt-40">
                            <div className="px-10">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="bg-[#002647] rounded-md px-8 py-10"
                                >
                                    {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

                                    <label className="text-slate-100 ">Identificación:</label>
                                    <input
                                        type="number"
                                        placeholder="x-xxxx-xxxx"
                                        className="text-slate-800 bg-slate-100 px-4 py-2 block mb-2 w-full"
                                        {...register('identification')}
                                    />
                                    {errors.identification?.message && <p className="text-red-700 text-xs">{errors.identification?.message}</p>}

                                    <label className="text-slate-100 ">Contraseña:</label>
                                    <input
                                        type="password"
                                        placeholder="*********"
                                        className="text-slate-800 bg-slate-100 px-4 py-2 block mb-2 w-full"
                                        {...register('password')}
                                    />
                                    {errors.password?.message && <p className="text-red-700 text-xs">{errors.password?.message}</p>}

                                    <button type="submit" className="bg-green-900 text-white text-md px-4 py-2 block w-full mt-4">
                                        Iniciar sesión
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="w-screen h-auto">
                        <div className="absolute left-10 bottom-0">
                            <Image src={"/tutleHS.png"} height="100" width={"1100"} alt="logo turtle" />
                        </div>
                    </div>

                </div>
            }
        </>

    );
}

export default LoginPage;