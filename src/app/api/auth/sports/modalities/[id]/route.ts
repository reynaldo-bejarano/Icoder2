import { connectDB } from "@/libs/mongodb";
import ModalitiesSport from "@/models/modalitiesSport";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const modalityDataByID = await ModalitiesSport.find({
        id: IDtoNumber
    });
    return NextResponse.json({
        modalityDataByID
    })

}