import { connectDB } from "@/libs/mongodb";
import Cita from "@/models/cita";

import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const fechaActual = new Date();
    const fechaConHoraCero = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDate()
      );
      // Convertir la fecha con la hora en 00:00:00 al formato ISO
      const fechaISOConHoraCero = fechaConHoraCero.toISOString().split('T')[0] + 'T00:00:00.000+00:00';

    const parseID = parseInt(params.id)

    const getDatesByUser = await Cita.find({
        user_id: parseID,
        date: fechaISOConHoraCero
    });

    return NextResponse.json({
        getDatesByUser
    })

}