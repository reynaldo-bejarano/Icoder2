
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Athlete from "@/models/athlete";

export async function GET(request: Request, { params }: any) {

    const page = params.id
    const limit = "12"
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    connectDB()
    const athletesData = await Athlete
        .find({})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalItems = await Athlete.countDocuments();

    return NextResponse.json({
        athletesData,
        totalPages: Math.ceil(totalItems / limitNumber),
        currentPage: pageNumber,
    })
}