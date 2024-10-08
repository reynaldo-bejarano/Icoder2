import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    // Conectarse a la base de datos
    await connectDB();

    // Extrae el ID del usuario y los nuevos datos del cuerpo de la solicitud
    const { userID, userData } = await request.json();

    // Actualiza el documento en la base de datos
    const updatedUser = await User.findByIdAndUpdate(userID, userData, {
      new: true,
      runValidators: true, // Asegúrate de que las validaciones del esquema se ejecuten
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 } // Devuelve un error 404 si el usuario no existe
      );
    }

    console.log("Usuario actualizado:", updatedUser);

    return NextResponse.json({
      status: 200, // Cambiado a 200 para indicar que la operación fue exitosa
      updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario", error: error.message },
      { status: 400 } // Devuelve un error 400 en caso de fallo
    );
  }
}
