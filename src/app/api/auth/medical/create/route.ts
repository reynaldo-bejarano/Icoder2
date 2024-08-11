import { connectDB } from "@/libs/mongodb";
import Medical from "@/models/medical";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { athlete, doctor, lesion, sport, active } = await request.json();

    try {
        await connectDB();
        const medical = new Medical({
            athlete, 
            doctor, 
            lesion, 
            sport, 
            active
        })
        console.log(medical)

        const saveMedical = await medical.save();
        console.log(saveMedical);

        return NextResponse.json(saveMedical);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}