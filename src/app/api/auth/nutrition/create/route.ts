import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Nutrition from "@/models/nutrition";

export async function POST(request: Request) {

    const { athlete_id, active, "1": value1, "2": value2, "3": value3, "4": value4, "5": value5, "6": value6 } = await request.json();

    try {
        await connectDB();

        const nutritionFound = await Nutrition.find({
            athlete_id: parseInt(athlete_id)
        })

        if (nutritionFound) {
            await Nutrition.deleteOne({
                athlete_id: parseInt(athlete_id)
            })
        }
        const nutrition = new Nutrition({
            athlete_id,
            "1": value1,
            "2": value2,
            "3": value3,
            "4": value4,
            "5": value5,
            "6": value6,
            active
        })

        const saveNutrition = await nutrition.save();

        return NextResponse.json({ message: 'Registro éxitoso' }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
    }

}