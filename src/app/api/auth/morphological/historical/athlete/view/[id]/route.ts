import { connectDB } from "@/libs/mongodb";
import Morphological from "@/models/morphological";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    try {
        connectDB()
        const IDtoNumber = parseInt(params.id)
        const morphologicalDataByID = await Morphological.find({
            'athlete_id': IDtoNumber,
            active: false
        });

        // If no document is found, return a 404 response
        if (!morphologicalDataByID) {
            return NextResponse.json({ message: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ morphologicalDataByID, status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}