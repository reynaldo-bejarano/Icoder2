import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Cita from "@/models/cita";

export async function DELETE(request) {
  const { idCita } = await request.json();
  console.log(idCita);
  try {
    await connectDB();
    // Eliminar la cita
    const resultado = await Cita.deleteOne({ _id: idCita });

    if (resultado.deletedCount === 1) {
      return NextResponse.json({ message: "Cita eliminada exitosamente" });
    } else {
      return NextResponse.json(
        { message: "No se encontró la cita" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
