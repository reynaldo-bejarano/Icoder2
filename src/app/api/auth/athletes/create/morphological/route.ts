import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Morphological from "@/models/morphological";

export async function POST(request: Request) {

    const { athlete_id, basic, percentage, circumference, arms, legs, gastrocnemius } = await request.json();

    try {
        await connectDB();
        const morphologicalFound = await Morphological.findOne({ athlete_id })

        if (morphologicalFound) return NextResponse.json({
            message: "Ese usuario ya existen en la base de datos"
        }, {
            status: 400,
        });

        const morphological = new Morphological({
            athlete_id,
            basic,
            percentage,
            circumference,
            arms,
            legs,
            gastrocnemius,
        })

        const saveMorphological = await morphological.save();
        console.log(saveMorphological);

        return NextResponse.json(saveMorphological);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}