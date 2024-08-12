import { connectDB } from "@/libs/mongodb";
import Medical from "@/models/medical";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: any) {
    try {
        connectDB()
        const updateMedicalActiveByDocument = await Medical.findByIdAndUpdate(
            params.id,
            { active: false }, // Actualiza el campo que necesitas
            { new: true } // Devuelve el documento actualizado
        );

        if (!updateMedicalActiveByDocument) {
            return NextResponse.json({ message: "Document not found" }, { status: 404 });
        }
        // If no document is found, return a 404 response
        return NextResponse.json({ message: "Documento cancelado", data: updateMedicalActiveByDocument }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}