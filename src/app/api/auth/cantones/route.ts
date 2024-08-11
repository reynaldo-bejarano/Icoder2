import { connectDB } from "@/libs/mongodb";
import Cantone from "@/models/cantone";
import { NextResponse } from "next/server";

export async function GET() {

    connectDB()
    
    const cantonesData = await Cantone.find();
    return NextResponse.json({
        cantonesData
    })



}