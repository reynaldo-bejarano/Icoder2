import { connectDB } from "@/libs/mongodb";
import Cita from "@/models/cita";

import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const parseID = parseInt(params.id)
    console.log(parseID)
    const getDatesByAthlete = await Cita.find({
        athlete_id: parseID
    });

    return NextResponse.json({
        getDatesByAthlete
    })

}