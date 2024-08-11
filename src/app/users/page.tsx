'use client'
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ModalDetailsUser from "../components/modals/modalDetailsUsers";
import { changedetailsmodal } from "@/redux/features/userdetailsmodalSlide";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { MdDisabledByDefault } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { useRouter } from "next/navigation";


const UsersPage = () => {

  const detailsModal = useAppSelector((state) => state.details.value)
  const dispatch = useAppDispatch()
  const [users, setUsers] = useState([])
  const [idDetails, setIdDetails] = useState<String>("")
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useRouter()


  useEffect(() => {

    async function getData() {
      try {
        const res = await axios.get(`/api/auth/users/${page}`)
        setUsers(res.data.usersData)
        setTotalPages(res.data.totalPages);
      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    }
    getData()

  }, [page])

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const res = await axios.get(`/api/auth/users/search/${searchTerm}`)
        return setUsers(res.data.usersData)
      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    } else {
      try {
        const res = await axios.get("/api/auth/users")
        setUsers(res.data.usersData)
      } catch (error) {
        if (error instanceof AxiosError) console.error('Error fetching data:', error);
      }
    }
  };

  function detailsButtonClick(id: String) {
    dispatch(changedetailsmodal());
    setIdDetails(id);
  }

  return (

    <div className='w-full h-screen '>

      {/* {statusModal ? <ModalRegisterUser /> : null} */}
      {detailsModal ? <ModalDetailsUser props={idDetails} /> : null}


      {/* Agregar / Buscar usuarios */}
      <div className='container mx-auto py-4'>
        <div className="flex items-center justify-between">
          <div className="w-full md:w-[50%] flex items-center ">
            <input type="text" placeholder="Ingresa el nombre del usuario" className="w-[80%] md:w-[90%] shadow-md py-2 px-3 outline-none	 text-slate-900 " onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="bg-slate-100 py-2 text-green-600 px-4 shadow-md rounded-r-md hover:bg-green-600 hover:text-slate-100 border" onClick={handleSearch}>Buscar</button>
          </div>
          <button
            onClick={() => navigation.push('users/create')}
            className='bg-green-600 px-4 py-2 rounded-md  text-slate-100 flex items-center gap-2'>
            <FaPlus />
            Agregar usuario
          </button>
        </div>
      </div>
      {/* Agregar / Buscar usuarios */}


      {/* tabla */}
      <div className="container w-full mx-auto ">
        <div className="bg-gray-800  text-gray-100 text-center">
        </div>
        <div className="lg:mt-0 rounded shadow bg-white">
          <table
            className="w-full text-sm grid"
          >
            <thead>
              <tr className="bg-gray-900 grid grid-cols-8 text-left  bg-opacity-100 py-2 text-sm text-white font-normal">
                <th className="md:pl-10 col-span-1">Identificación</th>
                <th className="md:pl-10 col-span-1">Rol</th>
                <th className="md:pl-10 col-span-1">Nombre</th>
                <th className="md:pl-10 col-span-1">Primer Apellido</th>
                <th className="md:pl-10 col-span-1">Segundo Apellido</th>
                <th className="md:pl-10 col-span-1">Email</th>
                <th className="md:pl-10 col-span-1">Telefono</th>
                <th className="md:pl-10 col-span-1 ">Acciones</th>
              </tr>
            </thead>
            <tbody>



              {users.map<any>((item: any) => {
                return (
                  <tr className="text-slate-900 grid grid-cols-8 text-left gap-2 border py-2 capitalize" key={item._id}>
                    <td className="col-span-1 pl-10">{item?.identification}</td>
                    <td className="col-span-1 pl-10">{item?.role}</td>
                    <td className="col-span-1 pl-10">{item?.name}</td>
                    <td className="col-span-1 pl-10">{item?.lastname1}</td>
                    <td className="col-span-1 pl-10">{item?.lastname2}</td>
                    <td className="col-span-1 pl-10 lowercase">{item?.email}</td>
                    <td className="col-span-1 pl-10">{item?.phone}</td>
                    <td className="flex gap-2 items-center justify-center col-span-1">
                      <button onClick={() => navigation.push(`users/view/${item.identification}`)} className="bg-slate-100  text-slate-800  text-2xl md:col-span-1 text-center ">
                        <BsFillInfoSquareFill />
                      </button>

                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* tabla */}

      {/* paginacion */}
      <div className="flex justify-end gap-2 items-center text-slate-900 py-2">
        <button
          className="border bg-slate-50 px-2 py-1 hover:bg-blue-500 hover:text-slate-100 rounded-md"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span >Página {page} de {totalPages}</span>
        <button
          className="border bg-slate-50 px-2 py-1 hover:bg-blue-500 hover:text-slate-100 rounded-md"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
      {/* paginacion */}

    </div >



  )
}

export default UsersPage