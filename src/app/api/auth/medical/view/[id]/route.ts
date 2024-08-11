import { connectDB } from "@/libs/mongodb";
import Medical from "@/models/medical";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const medicalDataByID = await Medical.find({
        'athlete.identification': IDtoNumber
    });
    return NextResponse.json({
        medicalDataByID
    })

}