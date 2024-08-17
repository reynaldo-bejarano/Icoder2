import { connectDB } from "@/libs/mongodb";
import Athlete from "@/models/athlete";
import Morphological from "@/models/morphological";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    const IDtoNumber = parseInt(params.id);
    connectDB()

    const athleteData = await Athlete.find({
        identification: IDtoNumber
    });
    const morphologicalData = await Morphological.find({
        athlete_id: IDtoNumber, 
        active: true
    });
    return NextResponse.json({
        athleteData,
        morphologicalData
    })

}