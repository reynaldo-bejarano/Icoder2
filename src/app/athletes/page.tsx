"use client";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { FaUserDoctor, FaBowlFood } from "react-icons/fa6";

const AthletesPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`/api/auth/athletes/${page}`);
        setAthletes(res.data.athletesData);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [page]);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const res = await axios.get(`/api/auth/athletes/search/${searchTerm}`);
        return setAthletes(res.data.athletesData);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
      }
    } else {
      try {
        const res = await axios.get(`/api/auth/athletes`);
        setAthletes(res.data.athletesData);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="w-full h-screen">
      {/* botones agregar , buscador */}
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="w-full md:w-[50%] flex items-center ">
            <input
              type="text"
              placeholder="Ingresa el nombre del usuario"
              className="w-[80%] md:w-[90%] shadow-md py-2 px-3 outline-none	 text-slate-900 "
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-slate-100 py-2 text-green-600 px-4 shadow-md rounded-r-md hover:bg-green-600 hover:text-slate-100 border"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
          <button
            className="bg-green-600 px-4 py-2 rounded-md  text-slate-100 flex items-center gap-2"
            onClick={(e) => {
              navigation.push("/athletes/create");
            }}
          >
            <FaPlus />
            Agregar deportista
          </button>
        </div>
      </div>
      {/* botones agregar , buscar */}

      {/* tabla */}

      <div className="container w-full mx-auto ">
        <div className="lg:mt-0 rounded shadow bg-white">
          <table className="w-full text-sm grid">
            <thead>
              <tr className="bg-gray-900 grid text-left grid-cols-9 bg-opacity-100 py-2 text-sm text-white font-normal">
                <th className="md:pl-10 col-span-1">Estado</th>
                <th className="md:pl-10 col-span-1">Identificación</th>
                <th className="md:pl-10 col-span-1">Nombre</th>
                <th className="md:pl-10 col-span-1">Primer Apellido</th>
                <th className="md:pl-10 col-span-1">Segundo Apellido</th>
                <th className="md:pl-10 col-span-1">Email</th>
                <th className="md:pl-10 col-span-1">Telefono</th>
                <th className="md:pl-10 col-span-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {athletes.map<any>((item: any) => {
                return (
                  <tr
                    className="text-slate-900 text-left grid grid-cols-9  gap-2 border py-2 capitalize"
                    key={item._id}
                  >
                    <td className="md:pl-10 col-span-1 ">
                      <span
                        className={
                          item?.active
                            ? "bg-green-800 rounded-md p-1 text-slate-100 text-xs"
                            : "bg-red-800 text-slate-100 rounded-md p-1 text-xs"
                        }
                      >
                        {item?.active ? "activado " : "desactivado"}
                      </span>
                    </td>
                    <td className="md:pl-10 col-span-1">
                      {item?.identification}
                    </td>
                    <td className="md:pl-10 col-span-1">{item?.name}</td>
                    <td className="md:pl-10 col-span-1">{item?.lastname1}</td>
                    <td className="md:pl-10 col-span-1">{item?.lastname2}</td>
                    <td className="md:pl-10 col-span-1 lowercase">
                      {item?.email}
                    </td>
                    <td className="md:pl-10 col-span-1">{item?.phone}</td>
                    <td className="md:pl-10 flex gap-2 items-center justify-center col-span-2">
                      <button
                        onClick={() =>
                          navigation.push(
                            `/athletes/view/${item?.identification}`
                          )
                        }
                        className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center "
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          navigation.push(
                            `/athletes/edit/${item?.identification}`
                          )
                        }
                        className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center "
                      >
                        <FaEdit />
                      </button>

                      <span>|</span>

                      <button
                        onClick={() =>
                          navigation.push(
                            `/rutine/athlete/view/${item?.identification}`
                          )
                        }
                        className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center "
                      >
                        <CgGym />
                      </button>
                      <button
                        onClick={() =>
                          navigation.push(
                            `/nutrition/athlete/view/${item?.identification}`
                          )
                        }
                        className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center "
                      >
                        <FaBowlFood />
                      </button>
                      <button
                        onClick={() =>
                          navigation.push(
                            `/medical/athlete/view/${item?.identification}`
                          )
                        }
                        className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center "
                      >
                        <FaUserDoctor />
                      </button>
                      <button
                        onClick={() =>
                          navigation.push(
                            `/dates/create/${item?.identification}`
                          )
                        }
                        className="bg-transparent   text-slate-800  text-xl md:col-span-1 text-center "
                      >
                        <BsCalendar2DateFill />
                      </button>
                    </td>
                  </tr>
                );
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
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="border bg-slate-50 px-2 py-1 hover:bg-blue-500 hover:text-slate-100 rounded-md"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* paginacion */}
    </div>
  );
};

export default AthletesPage;
