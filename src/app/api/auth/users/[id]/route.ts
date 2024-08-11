
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function GET(request: Request, { params }: any) {

    const page = params.id
    const limit = "12"
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    connectDB()
    const usersData = await User
        .find({})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const totalItems = await User.countDocuments();

    return NextResponse.json({
        usersData,
        totalPages: Math.ceil(totalItems / limitNumber),
        currentPage: pageNumber,
    })
}