import { connectDB } from "@/libs/mongodb";
import Medical from "@/models/medical";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
    try {
        connectDB()

        const medicalDataByDocument = await Medical.find({
            _id: params.id
        });

        // If no document is found, return a 404 response
        if (!medicalDataByDocument) {
            return NextResponse.json({ message: "Document not found" }, { status: 404 });
        }

        return NextResponse.json({ medicalDataByDocument, status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}