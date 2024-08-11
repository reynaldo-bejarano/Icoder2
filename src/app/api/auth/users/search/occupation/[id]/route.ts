import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";





export async function GET(request: Request, { params }: any) {

    connectDB();
    const getUserByRole = await User.find({
        role: { $regex: params.id, $options: 'i' }
    });
    console.log(getUserByRole)
    return NextResponse.json({
        getUserByRole
    })

}