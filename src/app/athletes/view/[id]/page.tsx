"use client";
import calcularEdad from "@/hooks/calculateAge";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiEditBoxFill } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import DateTable from "@/app/components/dates/table/athlete/page";
import RutineTable from "@/app/components/rutines/table/page";
import TableNutrition from "@/app/components/nutrition/table/page";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFProfile from "@/app/components/pdf/profile";

const ViewAthlete = () => {
  const [athlete, setAthlete] = useState<any>();
  const [morphological, setMorphological] = useState<any>();
  const [sportDataByID, setSportDataByID] = useState<any>();
  const [modalityDataByID, setModalityDataByID] = useState<any>();
  const [cantonDataByID, setCantonDataByID] = useState<any>();
  const [distritoDataByID, setDistritoDataByID] = useState<any>();
  const [totalLesiones, setTotalLesiones] = useState<any>(0);
  const navigation = useRouter();
  const searchParams = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/auth/athletes/view/${searchParams.id}`
        );
        setAthlete(res.data.athleteData[0]);
        setMorphological(res.data.morphologicalData[0]);
        const response = await axios.get(
          `/api/auth/medical/document/count/${searchParams.id}`
        );
        setTotalLesiones(response.data.totalItems);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resSport = await axios.get(
          `/api/auth/sports/view/${athlete?.activity?.sport_id}`
        );
        setSportDataByID(resSport.data.sportDataByID[0]);
        const resActivity = await axios.get(
          `/api/auth/sports/modalities/${athlete?.activity?.modality_id}`
        );
        setModalityDataByID(resActivity.data.modalityDataByID[0]);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    if (athlete?.activity) {
      fetchData();
    }
  }, [athlete]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resCanton = await axios.get(
          `/api/auth/cantones/view/${athlete?.address?.canton_id}`
        );
        setCantonDataByID(resCanton.data.cantonDataByID[0]);
        const resDistrito = await axios.get(
          `/api/auth/distritos/view/${athlete?.address?.distrito_id}`
        );
        setDistritoDataByID(resDistrito.data.distritoDataByID[0]);
      } catch (error) {
        if (error instanceof AxiosError)
          console.error("Error fetching data:", error);
      }
    }
    if (athlete?.address) {
      fetchData();
    }
  }, [athlete]);

  return (
    <div className="w-full  bg-slate-100 ">
      <div className="container w-full mx-auto py-4 text-slate-900">
        <div className="grid grid-cols-4 gap-4 w-full text-sm">
          {/* header */}
          <div className=" bg-slate-800 py-2 px-4 col-span-4 flex gap-4 items-center justify-between ">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigation.push("/athletes")}
                className=" flex items-center gap-1 bg-slate-200 py-1 px-2 text-slate-90 rounded-md md:col-span-1 text-center "
              >
                Volver
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  navigation.push(`/dates/create/${athlete?.identification}`)
                }
                className=" flex items-center gap-1 bg-slate-100 py-1 px-2 text-slate-900 rounded-md md:col-span-1 text-center "
              >
                <CiCalendarDate className="text-slate-900 text-md" />
                <span className="text-md">Agendar cita</span>
              </button>
              <button
                onClick={() =>
                  navigation.push(
                    `/rutine/athlete/view/${athlete?.identification}`
                  )
                }
                className=" flex items-center gap-1 bg-purple-600 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
              >
                <RiEditBoxFill className="text-slate-100 text-md" />
                <span className="text-md">Rutina</span>
              </button>
              <button
                onClick={() =>
                  navigation.push(
                    `/nutrition/athlete/view/${athlete?.identification}`
                  )
                }
                className=" flex items-center gap-1 bg-cyan-600 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
              >
                <RiEditBoxFill className="text-slate-100 text-md" />
                <span className="text-md">Nutrición</span>
              </button>
              <button
                onClick={() =>
                  navigation.push(
                    `/medical/athlete/view/${athlete?.identification}`
                  )
                }
                className=" flex items-center gap-1 bg-blue-500 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
              >
                <RiEditBoxFill className="text-slate-100 text-md" />
                <span className="text-md flex gap-2">
                  Médico
                  <span
                    className={
                      totalLesiones > 0
                        ? "bg-red-600 rounded-full h-5 w-5"
                        : "hidden"
                    }
                  >
                    {totalLesiones}
                  </span>
                </span>
              </button>
              <button
                onClick={() =>
                  navigation.push(
                    `/morphological/view/${athlete?.identification}`
                  )
                }
                className=" flex items-center gap-1 bg-pink-500 py-1 px-2 text-slate-100 rounded-md md:col-span-1 text-center "
              >
                <RiEditBoxFill className="text-slate-100 text-md" />
                <span className="text-md flex gap-2">Morfología</span>
              </button>
            </div>
          </div>
          {/* header */}

          <div className="col-span-4  flex justify-end gap-2 px-4 bg-slate-200 py-2">
            <button className=" flex items-center gap-1 bg-slate-400 py-1 px-2 text-slate-100  md:col-span-1 text-center rounded-md text-xs ">
              <RiEditBoxFill className="text-slate-100 text-md" />
              <span className="text-md">Editar datos</span>
            </button>
            <PDFDownloadLink
              document={
                <PDFProfile
                  athleteData={athlete}
                  morphologicalData={morphological}
                  cantonData={cantonDataByID}
                  distritoData={distritoDataByID}
                  sportData={sportDataByID}
                  modalityData={modalityDataByID}
                />
              }
              fileName={`perfil ${searchParams.id}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button
                    className="bg-slate-400 py-1 px-2 text-slate-100  md:col-span-1 text-center rounded-md text-xs"
                    disabled={true}
                  >
                    Cargando perfil
                  </button>
                ) : (
                  <button className="bg-slate-400 py-1 px-2 text-slate-100  md:col-span-1 text-center rounded-md text-xs">
                    Descargar perfil
                  </button>
                )
              }
            </PDFDownloadLink>
            <button className=" flex items-center gap-1 bg-slate-400 py-1 px-2 text-slate-100  md:col-span-1 text-center rounded-md text-xs ">
              Desactivar perfil
            </button>
          </div>

          {/* Datos personales*/}
          <div className="w-full bg-slate-200 p-4 col-span-4 md:col-span-2">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4">Datos personales</h2>
            </div>

            <div className="py-1 grid grid-cols-3 gap-4 w-full ">
              <div className="grid gap-1">
                <label>Identificación</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.identification || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Edad</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.birth
                    ? calcularEdad(`${athlete?.birth}`)
                    : "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Género</label>
                <span className="w-full col-span-3 px-2 bg-slate-100 capitalize">
                  {athlete?.genre || "Cargando"}
                </span>
              </div>
            </div>
            <div className="py-1 grid grid-cols-3 gap-4 w-full ">
              <div className="grid gap-1">
                <label>Nombre</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.name || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Primer Apellido</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.lastname1 || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1">
                <label>Segundo Apellido</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.lastname2 || "Cargando"}
                </span>
              </div>
            </div>
            <div className="py-1 grid grid-cols-3 gap-4 w-full">
              <div className="grid gap-1 col-span-2">
                <label>Correo electrónico</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.email || "Cargando"}
                </span>
              </div>
              <div className="grid gap-1 col-span-1">
                <label>Teléfono</label>
                <span className="w-full px-2 bg-slate-100">
                  {athlete?.phone || "Cargando"}
                </span>
              </div>
            </div>
          </div>
          {/* Datos personales*/}

          {/* Ubicación */}
          <div className="w-full bg-slate-200 p-4 col-span-4 md:col-span-1">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4">Datos Demográficos</h2>
            </div>
            <div className="grid gap-5 py-5">
              <div className=" grid w-full">
                <div className="grid grid-cols-4 gap-2 ">
                  <label className="col-span-1">Provincia</label>
                  <span className="w-full col-span-3 px-2 bg-slate-100 capitalize">
                    {athlete?.address.provincia_id || "Cargando"}
                  </span>
                </div>
              </div>
              <div className="grid w-full">
                <div className="grid grid-cols-4 gap-2 ">
                  <label className="col-span-1">Cantón</label>
                  <span className="w-full col-span-3 px-2 bg-slate-100">
                    {cantonDataByID?.nombre || "Cargando..."}
                  </span>
                </div>
              </div>
              <div className=" grid w-full">
                <div className="grid grid-cols-4 gap-2 ">
                  <label className="col-span-1">Distrito</label>
                  <span className="w-full col-span-3 px-2 bg-slate-100">
                    {distritoDataByID?.nombre || "Cargando..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Ubicación */}

          {/* Deportes */}
          <div className="w-full bg-slate-200 p-4 col-span-4 md:col-span-1">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4">Actividad física</h2>
            </div>

            <div className="grid gap-5 py-5">
              <div className=" grid w-full">
                <div className="grid grid-cols-4 gap-2 ">
                  <label className="col-span-1">Deporte</label>
                  <span className="w-full col-span-3 px-2 bg-slate-100">
                    {sportDataByID?.name || "Cargando..."}
                  </span>
                </div>
              </div>
              <div className="grid w-full">
                <div className="grid grid-cols-4 gap-2 ">
                  <label className="col-span-1">Modalidad</label>
                  <span className="w-full col-span-3 px-2 capitalize bg-slate-100">
                    {modalityDataByID?.name || "Cargando..."}
                  </span>
                </div>
              </div>
              <div className=" grid w-full">
                <div className="grid grid-cols-4 gap-2 ">
                  <label className="col-span-1">Intensidad</label>
                  <span className="w-full col-span-3 px-2 bg-slate-100">
                    {athlete?.activity.intensity || "Cargando"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Deportes */}

          {/* </>
            )
          })} */}
          {/* Cierre Map  */}

          {/* Morfologia */}
          <div className="w-full bg-slate-200 p-4 col-span-4">
            <div className="bg-slate-800">
              <h2 className="text-slate-100 w-full mx-4">Datos morfológicos</h2>
            </div>
            <div className="grid md:grid-cols-6 gap-2 ">
              {/* basico */}
              <div className="grid col-span-6 md:col-span-1 gap-2 ">
                <div className="grid gap-2 mt-2 p-2 bg-slate-100">
                  <label className="text-center">Basíco</label>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Estatura</label>
                      <div className="grid grid-cols-2 ">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.basic?.height || "0"}
                        </span>
                        <p>cm</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Peso</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.basic?.weight || "0"}
                        </span>
                        <p>kl</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">IMC</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.basic?.IMC || "0"}
                        </span>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* basico */}

              {/* porcentaje */}
              <div className="grid col-span-6 md:col-span-1 gap-2 ">
                <div className="grid gap-2 mt-2 p-2 bg-slate-100">
                  <label className="text-center">Porcentaje</label>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Grasa</label>
                      <div className="grid grid-cols-2 ">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.percentage?.fat || "0"}
                        </span>
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Musculo</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.percentage?.muscle || "0"}
                        </span>
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Agua</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.percentage?.water || "0"}
                        </span>
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* porcentaje */}

              {/* circunferencia */}
              <div className="grid col-span-6 md:col-span-1 gap-2 ">
                <div className="grid gap-2 mt-2 p-2 bg-slate-100">
                  <label className="text-center">Cincunferencia</label>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Cintura</label>
                      <div className="grid grid-cols-2 ">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.circumference?.waist || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Cadera</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.circumference?.hip || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* circunferencia */}
              {/* Brazo */}
              <div className="grid col-span-6 md:col-span-1 gap-2 ">
                <div className="grid gap-2 mt-2 p-2 bg-slate-100">
                  <label className="text-center">Circunferencia Brazos</label>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Derecho</label>
                      <div className="grid grid-cols-2 ">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.arms?.aright || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Izquierdo</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.arms?.aleft || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Brazo */}

              {/* pierna */}
              <div className="grid col-span-6 md:col-span-1 gap-2 ">
                <div className="grid gap-2 mt-2 p-2 bg-slate-100">
                  <label className="text-center">Circunferencia Pierna</label>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Derecha</label>
                      <div className="grid grid-cols-2 ">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.legs?.lright || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Izquierda</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.legs?.lleft || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* pierna */}

              {/* gastrocnemio */}
              <div className="grid col-span-6 md:col-span-1 gap-2 ">
                <div className="grid gap-2 mt-2 p-2 bg-slate-100">
                  <label className="text-center">Gastrocnemio</label>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Derecho</label>
                      <div className="grid grid-cols-2 ">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.gastrocnemius?.gright || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-2 ">
                      <label className="col-span-1">Izquierdo</label>
                      <div className="grid grid-cols-2">
                        <span className="w-8 text-center bg-slate-100">
                          {morphological?.gastrocnemius?.gleft || "0"}
                        </span>
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* gastrocnemio */}
            </div>
          </div>
        </div>

        <DateTable />
        <RutineTable />
        <TableNutrition />
      </div>
    </div>
  );
};

export default ViewAthlete;
