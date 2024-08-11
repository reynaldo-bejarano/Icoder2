import { connectDB } from "@/libs/mongodb";
import Cita from "@/models/cita";

import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const fechaISO = new Date(params.id).toISOString()

    const fechas = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "13:00 PM", "14:00 PM", "15:00 PM", "16:00 PM"]
    const getDatesByDate = await Cita.find({
        date: fechaISO
    });

    let filterTime: Array<String> = []

    if (getDatesByDate.length === 0) {
        return NextResponse.json({
            filterTime: fechas
        })
    }

    let filtradoTotal: Array<String> = []
    getDatesByDate.map<any>((item: any) => {
        filtradoTotal.push(item.time)
    })

    filterTime = fechas.filter(item => !filtradoTotal.includes(item));

    return NextResponse.json({
        filterTime
    })

}