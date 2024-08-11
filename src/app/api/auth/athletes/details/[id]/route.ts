import { connectDB } from "@/libs/mongodb";
import Athlete from "@/models/athlete";
import { NextResponse } from "next/server";

// export async function GET(request: Request, { params }: any) {

//     connectDB()

//     const athletesData = await Athlete.findById(params.id);
//     console.log(athletesData)
//     return NextResponse.json({
//         athletesData
//     })
// }

export async function GET(request: Request, { params }: any) {

    connectDB()
    const IdNumber = parseInt(params.id)
    const athleteData = await Athlete.find({
        identification: IdNumber
    });
    return NextResponse.json({
        athleteData
    })
}