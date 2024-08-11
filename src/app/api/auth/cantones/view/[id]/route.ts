import { connectDB } from "@/libs/mongodb";
import Cantone from "@/models/cantone";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const cantonDataByID = await Cantone.find({
        id: IDtoNumber
    });
    return NextResponse.json({
        cantonDataByID
    })

}