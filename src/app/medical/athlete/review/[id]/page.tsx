"use client";
import calcularEdad from "@/hooks/calculateAge";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Inputs = {
  area: string;
  tipo: string;
  grado: string;
  especificacion: string;
  recuperacion: string;
  anotacion: string;
  recomendacion: string;
};

const ReviewMedical = () => {
  const { data: session } = useSession<any>();
  const [medicalData, setMedicalData] = useState<any>();
  const navigation = useRouter();
  const searchParams = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/auth/medical/document/${searchParams.id}`
        );
        setMedicalData(res.data.medicalDataByDocument[0]);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [searchParams]);

  const handleFinishButton = async () => {
    try {
      const res = await axios.patch(
        `/api/auth/medical/document/cancel/${searchParams.id}`
      );
      console.log(res);
      toast.success("Lesión finalizada correctamente");
      navigation.push(
        `/medical/athlete/view/${medicalData?.athlete?.identification}`
      );
    } catch (error) {
      if (error instanceof AxiosError)
        console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="container w-full mx-auto py-4 text-slate-900">
        {/* header */}
        <div className=" bg-slate-800 py-2 px-4 col-span-4 flex gap-4 items-center justify-between mb-2">
          <button
            type="button"
            onClick={() =>
              navigation.push(
                `/medical/athlete/view/${medicalData?.athlete?.identification}`
              )
            }
            className=" flex items-center gap-1 bg-slate-200 py-1 text-sm px-2 text-slate-90 rounded-md md:col-span-1 text-center "
          >
            Volver
          </button>
        </div>
        {/* header */}

        <div className="grid grid-cols-4 gap-4 w-full text-sm">
          {/* Datos personales*/}
          <div className="w-full bg-slate-200 p-4 col-span-4 md:col-span-2">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4">Datos personales</h2>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4 w-full ">
              <div className="grid gap-1">
                <label>Identificación</label>
                <span className="w-full px-2 bg-slate-100 italic">
                  {medicalData?.athlete?.identification || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Edad</label>
                <span className="w-full px-2 bg-slate-100 italic">
                  {medicalData?.athlete?.birth &&
                    calcularEdad(`${medicalData?.athlete?.birth}`)}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Género</label>
                <span className="w-full col-span-3 px-2 bg-slate-100 capitalize italic">
                  {medicalData?.athlete?.genre || "Cargando"}
                </span>
              </div>
            </div>
            <div className="py-1 grid grid-cols-3 gap-4 w-full ">
              <div className="grid gap-1">
                <label>Nombre</label>
                <span className="w-full px-2 bg-slate-100 italic">
                  {medicalData?.athlete?.name || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Primer Apellido</label>
                <span className="w-full px-2 bg-slate-100 italic">
                  {medicalData?.athlete?.lastname1 || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Segundo Apellido</label>
                <span className="w-full px-2 bg-slate-100 italic">
                  {medicalData?.athlete?.lastname2 || "Cargando"}
                </span>
              </div>
            </div>
          </div>
          {/* Datos personales*/}

          {/* Deporte*/}
          <div className="w-full bg-slate-200 p-4 col-span-4 md:col-span-2">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4">Deporte</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full py-4">
              <div className="grid gap-1">
                <label>Deporte</label>
                <span className="w-full px-2 bg-slate-100 italic capitalize">
                  {medicalData?.sport?.name || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Modalidad</label>
                <span className="w-full px-2 bg-slate-100 italic capitalize">
                  {medicalData?.sport?.modality || "Cargando..."}
                </span>
              </div>
            </div>
          </div>
          {/* Deporte*/}
        </div>

        {/* Formulario */}
        <div className="grid grid-cols-4 gap-4 w-full text-sm py-4">
          {/* Informa Lesion*/}
          <div className="w-full bg-slate-200 p-4 col-span-4 md:col-span-4">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4 text-center py-1">
                Informe de lesión
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-10 py-2">
              <div className="col-span-2">
                <div className="py-1 grid grid-cols-6 gap-4 w-full ">
                  <div className="grid gap-1 col-span-2">
                    <label>Área de lesión</label>
                    <span className="w-full px-2 py-1 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.area || "Cargando..."}
                    </span>
                  </div>
                  <div className="grid gap-1 col-span-2">
                    <label>Tipo</label>
                    <span className="w-full px-2 py-1 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.tipo || "Cargando..."}
                    </span>
                  </div>
                  <div className="grid gap-1 col-span-2 ">
                    <label>Grado</label>
                    <span className="w-full px-2 py-1 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.grado || "Cargando..."}
                    </span>
                  </div>
                  <div className="grid gap-1 col-span-4 ">
                    <label>Especificación</label>
                    <span className="w-full px-2 py-1 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.especificacion || "Cargando..."}
                    </span>
                  </div>
                  <div className="grid gap-1 col-span-2 ">
                    <label>Tiempo de recuperación</label>
                    <span className="w-full px-2 py-1 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.recuperacion || "Cargando..."}
                    </span>
                  </div>
                  <div className="grid gap-1 col-span-6">
                    <label>Anotaciones</label>
                    <span className="w-full h-14 px-2 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.anotacion || " "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="py-1 grid grid-cols-3 gap-4 w-full">
                  <div className="grid gap-1 col-span-3">
                    <label>Recomendaciones</label>
                    <span className="w-full h-48 px-2 bg-slate-100 italic capitalize">
                      {medicalData?.lesion?.recomendacion || " "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {session?.user?.role === "médico" && (
              <div className="py-4 bg-slate-200 flex justify-end gap-4">
                <button
                  onClick={handleFinishButton}
                  className={
                    medicalData?.active
                      ? "bg-slate-400 px-4 py-2 rounded-md shadow-lg text-slate-100"
                      : "hidden"
                  }
                >
                  Finalizar
                </button>
              </div>
            )}
            {session?.user?.role === "terapía física" && (
              <div className="py-4 bg-slate-200 flex justify-end gap-4">
                <button
                  onClick={handleFinishButton}
                  className={
                    medicalData?.active
                      ? "bg-slate-400 px-4 py-2 rounded-md shadow-lg text-slate-100"
                      : "hidden"
                  }
                >
                  Finalizar
                </button>
              </div>
            )}
            {session?.user?.role === "admin" && (
              <div className="py-4 bg-slate-200 flex justify-end gap-4">
                <button
                  onClick={handleFinishButton}
                  className={
                    medicalData?.active
                      ? "bg-slate-400 px-4 py-2 rounded-md shadow-lg text-slate-100"
                      : "hidden"
                  }
                >
                  Finalizar
                </button>
              </div>
            )}
          </div>
          {/* Informa Lesion*/}
        </div>
        {/* Formulario */}
      </div>
    </div>
  );
};

export default ReviewMedical;
