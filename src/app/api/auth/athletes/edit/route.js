import { connectDB } from "@/libs/mongodb";
import Athlete from "@/models/athlete";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    // Conectarse a la base de datos
    await connectDB();

    // Extrae el ID del usuario y los nuevos datos del cuerpo de la solicitud
    const { userID, userData } = await request.json();

    // Actualiza el documento en la base de datos
    const updatedAthlete = await Athlete.findByIdAndUpdate(userID, userData, {
      new: true,
      runValidators: true, // Asegúrate de que las validaciones del esquema se ejecuten
    });

    if (!updatedAthlete) {
      return NextResponse.json(
        { message: "Deportista no encontrado" },
        { status: 404 } // Devuelve un error 404 si el usuario no existe
      );
    }

    console.log("Deportista actualizado:", updatedAthlete);

    return NextResponse.json({
      status: 200, // Cambiado a 200 para indicar que la operación fue exitosa
      updatedAthlete,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario", error: error.message },
      { status: 400 } // Devuelve un error 400 en caso de fallo
    );
  }
}
