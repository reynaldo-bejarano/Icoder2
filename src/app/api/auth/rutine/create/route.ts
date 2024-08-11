import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Rutine from "@/models/rutine";

export async function POST(request: Request) {

    const { athlete_id, pe1, pe2, pe3, pe4, pe5, pe6, pe7, pe8, pe9, pe10, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, pi1, pi2, pi3, pi4, pi5, pi6, pi7, pi8, pi9, pi10, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, pecho, brazos, espalda, piernas, abdomen, hombros } = await request.json();

    try {
        await connectDB();

        const rutineFound = await Rutine.find({
            athlete_id: parseInt(athlete_id)
        })

        if (rutineFound) {
            await Rutine.deleteOne({
                athlete_id: parseInt(athlete_id)
            })
        }
        const rutine = new Rutine({
            athlete_id, pe1, pe2, pe3, pe4, pe5, pe6, pe7, pe8, pe9, pe10, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, pi1, pi2, pi3, pi4, pi5, pi6, pi7, pi8, pi9, pi10, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, pecho, brazos, espalda, piernas, abdomen, hombros
        })

        const saveRutine = await rutine.save();

        return NextResponse.json(saveRutine);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}