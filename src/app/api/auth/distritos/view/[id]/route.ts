import { connectDB } from "@/libs/mongodb";
import Distrito from "@/models/distrito";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const distritoDataByID = await Distrito.find({
        id: IDtoNumber
    });
    return NextResponse.json({
        distritoDataByID
    })

}