import { connectDB } from "@/libs/mongodb";
import Medical from "@/models/medical";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    try {
        connectDB()
        const IDtoNumber = parseInt(params.id)
        console.log(IDtoNumber)
        const medicalDataByID = await Medical.find({
            'athlete.identification': IDtoNumber,
            active: true
        });

        // If no document is found, return a 404 response
        if (!medicalDataByID) {
            return NextResponse.json({ message: "Document not found", }, { status: 404 });
        }
        const totalItems = medicalDataByID.length;
        

        return NextResponse.json({ totalItems, status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}