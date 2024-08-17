import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Morphological from "@/models/morphological";

export async function PATCH(request: Request) {

    const { basic, percentage, circumference, arms, legs, gastrocnemius, active, _id } = await request.json();

    console.log(11111)
    try {
        await connectDB();
        const morphologicalFound = await Morphological.findById(_id)
        
        const morphologicalUpdate = await Morphological.findByIdAndUpdate(
            _id,
            { active: false }, // Actualiza el campo que necesitas
            { new: true } // Devuelve el documento actualizado
        )
       
        const morphological = new Morphological({
            athlete_id: morphologicalFound.athlete_id,
            basic,
            percentage,
            circumference,
            arms,
            legs,
            gastrocnemius,
            active
        })

        const saveMorphological = await morphological.save();

        return NextResponse.json(saveMorphological);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}