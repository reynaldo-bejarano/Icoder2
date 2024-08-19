import { connectDB } from "@/libs/mongodb";
import Medical from "@/models/medical";
import Nutrition from "@/models/nutrition";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    try {
        connectDB()
        const IDtoNumber = parseInt(params.id)
        const nutritionDataByID = await Nutrition.find({
            'athlete_id': IDtoNumber,
            active: true
        });

        // If no document is found, return a 404 response
        if (!nutritionDataByID) {
            return NextResponse.json({ message: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ nutritionDataByID, status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}