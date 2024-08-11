import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {

    connectDB()
    console.log(params.id)
    
    const usersData = await User.find({
        name: {$regex: params.id, $options: 'i'}
    });
    console.log(usersData)
    return NextResponse.json({
        usersData
    })



}