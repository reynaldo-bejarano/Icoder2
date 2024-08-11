import { connectDB } from "@/libs/mongodb";
import ModalitiesSport from "@/models/modalitiesSport";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IDtoNumber = parseInt(params.id)
    const modalitiesData = await ModalitiesSport.find({

        sports_id: { $in: [IDtoNumber] }
    });
    return NextResponse.json({
        modalitiesData
    })

}