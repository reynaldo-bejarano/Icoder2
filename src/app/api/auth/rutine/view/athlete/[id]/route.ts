import { connectDB } from "@/libs/mongodb";
import Rutine from "@/models/rutine";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const parseID = parseInt(params.id)
    console.log(parseID)
    const getRutineByAthlete = await Rutine.find({
        athlete_id: parseID
    });

    return NextResponse.json({
        getRutineByAthlete
    })

}