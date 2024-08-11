import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Cita from "@/models/cita";

export async function POST(request: Request) {

    const { athlete_id, user_id, athlete_name,occupation, date, time, specialist } = await request.json();

    try {
        await connectDB();
        const cita = new Cita({
            athlete_id,
            user_id,
            occupation,
            specialist,
            athlete_name,
            date: new Date(date).toISOString(),
            time,
            active: true
        })

        const saveCita = await cita.save();

        return NextResponse.json(saveCita);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}