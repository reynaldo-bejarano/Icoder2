import { connectDB } from "@/libs/mongodb";
import Athlete from "@/models/athlete";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    
    const athletesData = await Athlete.find({
        name: {$regex: params.id, $options: 'i'}
    });
    console.log(athletesData)
    return NextResponse.json({
        athletesData
    })

}