import { connectDB } from "@/libs/mongodb";
import Sport from "@/models/sport";
import { NextResponse } from "next/server";

export async function GET() {

    connectDB()
    
    const sportsData = await Sport.find();
    return NextResponse.json({
        sportsData
    })

}