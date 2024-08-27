import { connectDB } from "@/libs/mongodb";
import Athlete from "@/models/athlete";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        connectDB()
        const usersCount = await User.countDocuments();
        const entrenadoresCount = await User.countDocuments({
            role: "entrenador"
        });
        const fisioterapeutasCount = await User.countDocuments({
            role: "terapía física"
        });
        const nutricionistasCount = await User.countDocuments({
            role: "nutrición"
        });
        const medicosCount = await User.countDocuments({
            role: "médico"
        });
        const AthletesCount = await Athlete.countDocuments();



        return NextResponse.json({
            usersCount,
            AthletesCount,
            entrenadoresCount,
            fisioterapeutasCount,
            nutricionistasCount,
            medicosCount
        })

    } catch (error) {
        return NextResponse.json({
            error: 'Error al obtener el total de usuarios'
        }, { status: 500 });
    }


}