import { gruposIDS } from "@/libs/gruposIDS";
import { gruposMusculares } from "@/libs/gruposMusculares";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PDFRutine from "../../pdf/rutine";

const RutineTable = () => {
  const [rutine, setRutine] = useState<any>([]);
  const athleteID = useParams();

  //getDates
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/auth/rutine/view/athlete/${athleteID.id}`
        );
        setRutine(res.data.getRutineByAthlete);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [athleteID]);

  return (
    <>
      <div className=" bg-slate-200 items-center justify-center">
        {/* Dia */}

        <div className=" text-slate-100 p-2 grid grid-cols-6">
          <div className="text-center col-span-6  flex gap-2 justify-between px-5 bg-slate-900 text-slate-100 py-1 my-2">
            <span className=" text-base text-center">Rutina de ejercicios</span>
            <div>
              <PDFDownloadLink
                document={<PDFRutine rutineData={rutine} id={athleteID.id} />}
                fileName={`rutina ${athleteID.id}.pdf`}
              >
                {({ loading, url, error }) =>
                  loading ? (
                    <button
                      className="bg-slate-400 py-1 px-2 text-slate-100  text-center rounded-md text-xs"
                      disabled={true}
                    >
                      Cargando plan
                    </button>
                  ) : (
                    <button className="bg-slate-400 py-1 px-2 text-slate-100  text-center rounded-md text-xs">
                      Descargar plan
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
          {gruposMusculares.map<any>((g: any) => {
            return (
              // Grupo muscular
              <div
                className=" text-slate-900 h-full grid grid-cols-1 py-2 px-1 bg-slate-300 "
                key={Math.random()}
              >
                <div className="col-span-1 h-8 px-2 bg-slate-700 text-slate-100">
                  <div className="flex gap-2 items-center w-full h-full justify-center">
                    <span className="capitalize">{g.grupo}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid ">
                    {gruposIDS.map((i) => {
                      return (
                        <div key={Math.random()}>
                          {rutine.map((item: any) => {
                            // && item[i.id].active === true
                            if (g.grupo === item[i.id].musculo) {
                              return (
                                // aqui
                                <div
                                  className={
                                    item[i.id].active
                                      ? "grid grid-cols-6 border-b-2 border-r-2 border-l-2 h-12   items-center border-slate-300 bg-green-500 p-2 gap-2 py-2 text-xs"
                                      : "grid grid-cols-6 border-b-2  h-12  border-slate-300 bg-slate-400 p-2 gap-2 py-2 text-xs"
                                  }
                                  key={Math.random()}
                                >
                                  <div
                                    className={
                                      item[i.id]?.active
                                        ? "col-span-4 flex"
                                        : "col-span-6 flex "
                                    }
                                  >
                                    <span className="px-2 w-full italic text-md text-left">
                                      {item[i.id].ejercicio}
                                    </span>
                                  </div>
                                  <div
                                    className={
                                      item[i.id]?.active
                                        ? "col-span-2  bg-slate-100 rounded-lg shadow-lg justify-end gap-2"
                                        : "hidden"
                                    }
                                  >
                                    <div className="flex gap-2">
                                      <div className="flex gap-1 items-center justify-center w-full text-md">
                                        <span>{item[i.id].serie}</span>
                                        <span>x</span>
                                        <span>{item[i.id].reps}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {rutine.map((item: any) => {
                  return (
                    <div key={Math.random()}>
                      <div className="bg-slate-900  p-2" key={Math.random()}>
                        <div className="grid grid-cols-6 text-xs text-slate-100">
                          <div className="grid justify-center gap-1">
                            <label>Lun</label>
                            <span
                              className={
                                item[g.grupo].lunes
                                  ? " h-3 w-3 bg-green-600 mx-auto "
                                  : " h-3 w-3 mx-auto bg-gray-200 hidden"
                              }
                            ></span>
                          </div>
                          <div className="grid justify-center gap-1">
                            <label>Mar</label>
                            <span
                              className={
                                item[g.grupo].martes
                                  ? " h-3 w-3 bg-green-600 mx-auto "
                                  : " h-3 w-3 mx-auto bg-gray-200 hidden"
                              }
                            ></span>
                          </div>
                          <div className="grid justify-center gap-1">
                            <label>Mie</label>
                            <span
                              className={
                                item[g.grupo].miercoles
                                  ? " h-3 w-3 bg-green-600 mx-auto "
                                  : " h-3 w-3 mx-auto bg-gray-200 hidden"
                              }
                            ></span>
                          </div>
                          <div className="grid justify-center gap-1">
                            <label>Jue</label>
                            <span
                              className={
                                item[g.grupo].jueves
                                  ? " h-3 w-3 bg-green-600 mx-auto "
                                  : " h-3 w-3 mx-auto bg-gray-200 hidden"
                              }
                            ></span>
                          </div>
                          <div className="grid justify-center gap-1">
                            <label>Vie</label>
                            <span
                              className={
                                item[g.grupo].viernes
                                  ? " h-3 w-3 bg-green-600 mx-auto "
                                  : " h-3 w-3 mx-auto bg-gray-200 hidden"
                              }
                            ></span>
                          </div>
                          <div className="grid justify-center gap-1">
                            <label>Sab</label>
                            <span
                              className={
                                item[g.grupo].sabado
                                  ? " h-3 w-3 bg-green-600 mx-auto "
                                  : " h-3 w-3 mx-auto bg-gray-200 hidden"
                              }
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              //Musculo
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RutineTable;
