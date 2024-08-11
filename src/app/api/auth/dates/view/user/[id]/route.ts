import { connectDB } from "@/libs/mongodb";
import Cita from "@/models/cita";

import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const parseID = parseInt(params.id)
    console.log(parseID)
    const getDatesByUser = await Cita.find({
        user_id: parseID
    });

    return NextResponse.json({
        getDatesByUser
    })

}