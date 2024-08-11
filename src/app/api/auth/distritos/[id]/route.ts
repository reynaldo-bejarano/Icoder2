import { connectDB } from "@/libs/mongodb";
import Distrito from "@/models/distrito";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const distritosData = await Distrito.find({
        canton_id: IDtoNumber
    });

    return NextResponse.json({
        distritosData
    })

}