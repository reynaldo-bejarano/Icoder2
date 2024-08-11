import { useRouter } from "next/navigation"


const Back = ({ props }: any) => {
    const navigation = useRouter()

    return (

        < div className=' bg-slate-800 mt-4 px-4 py-2 flex gap-4 items-center justify-between  ' >
            <button
                type='button'
                onClick={() => navigation.push(`/athletes/view/${props}`)}
                className=" flex items-center gap-1 bg-slate-200 py-1 px-2 text-slate-900 text rounded-md  text-sm text-center "
            >
                Volver
            </button>
        </div >

    )
}

export default Back