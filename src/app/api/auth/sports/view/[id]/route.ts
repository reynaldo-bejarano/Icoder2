import { connectDB } from "@/libs/mongodb";
import Sport from "@/models/sport";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const sportDataByID = await Sport.find({
        id: IDtoNumber
    });
    return NextResponse.json({
        sportDataByID
    })

}