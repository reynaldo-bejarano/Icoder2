import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    const usersData = await User.findById(params.id);
    console.log(usersData)
    return NextResponse.json({
        usersData
    })



}