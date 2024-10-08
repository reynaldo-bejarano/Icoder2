import converterIsoStringToDate from "@/hooks/converterIsoStringToDate";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DateTable = () => {
  const [dates, setDates] = useState([]);
  const athleteID = useParams();
  const [isLoading, setIsLoading] = useState(false);

  //getDates
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/auth/dates/view/athlete/${athleteID.id}`
        );
        setDates(res.data.getDatesByAthlete);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [athleteID]);

  const handleEliminar = async (idCita: string) => {
    setIsLoading(true);
    try {
      const respuesta = await axios.delete("/api/auth/dates/cancel", {
        data: { idCita },
      });
      toast.success("Cita eliminada correctamente");
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container w-full mx-auto py-10">
      <div className="bg-gray-800  text-gray-100 text-center py-2">
        Citas disponibles
      </div>
      <div className="lg:mt-0 rounded shadow bg-white">
        <table className="w-full text-sm grid">
          <thead>
            <tr className="bg-gray-900 grid grid-cols-9 text-left  bg-opacity-100 py-2 text-sm text-white font-normal">
              <th className="md:pl-10 col-span-1">Estado</th>
              <th className="md:pl-10 col-span-1">Especialidad</th>
              <th className="md:pl-10 col-span-2">Especialista</th>
              <th className="md:pl-10 col-span-2">Atleta</th>
              <th className="md:pl-10 col-span-1">Fecha</th>
              <th className="md:pl-10 col-span-1">Horario</th>
              <th className="md:pl-10 col-span-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dates.length > 0 ? (
              dates.map<any>((item: any) => {
                return (
                  <tr
                    className="text-slate-900 grid grid-cols-9 items-center text-left gap-2 border py-2 capitalize"
                    key={item._id}
                  >
                    <td className="col-span-1 pl-10">
                      <span
                        className={
                          item?.active
                            ? "  bg-green-600 px-2 py-1 rounded-md text-xs text-slate-100"
                            : ""
                        }
                      >
                        {item?.active ? "Activado" : "Desactivado"}
                      </span>
                    </td>
                    <td className="col-span-1 pl-10">{item?.occupation}</td>
                    <td className="col-span-2 pl-10">{item?.specialist}</td>
                    <td className="col-span-2 pl-10">{item?.athlete_name}</td>
                    <td className="col-span-1 pl-10">
                      {item?.date && `${converterIsoStringToDate(item.date)}`}
                    </td>
                    <td className="col-span-1 pl-10">{item?.time}</td>
                    <td className="flex gap-2 items-center justify-center col-span-1">
                      <button
                        onClick={() => handleEliminar(item?._id)}
                        disabled={isLoading}
                        className={
                          isLoading
                            ? "bg-slate-700  text-slate-100  px-2 py-1 rounded-md md:col-span-1 text-center text-xs"
                            : "bg-red-600  text-slate-100  px-2 py-1 rounded-md md:col-span-1 text-center text-xs"
                        }
                      >
                        {isLoading ? "Cargando..." : "Cancelar"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-slate-900 grid grid-cols-7 items-center text-left gap-2 border py-2 capitalize">
                <td className="col-span-7 pl-10 text-center">
                  No existen citas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateTable;
