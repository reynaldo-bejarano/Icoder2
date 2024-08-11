import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    const IDtoNumber = parseInt(params.id);
    connectDB()

    const userData = await User.find({
        identification: IDtoNumber
    });

    return NextResponse.json({
        userData
    })

}