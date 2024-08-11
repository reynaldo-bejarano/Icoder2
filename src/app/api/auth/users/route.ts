import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'




export async function GET() {
    connectDB()
    const usersData = await User.find();
    console.log(usersData)
    return NextResponse.json({
        usersData
    })
}

export async function POST(request: Request) {

    const { identification, name, lastname1, lastname2, email, password, role, phone } = await request.json();

    try {
        await connectDB();
        const userFound = await User.findOne({ identification })

        if (userFound) return NextResponse.json({
            message: "Ese número de identificación ya existe en la base de datos"
        }, {
            status: 400,
        });


        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            identification,
            name,
            lastname1,
            lastname2,
            email,
            password: hashedPassword,
            role,
            phone,
        })

        const savedUser = await user.save();
        console.log(savedUser);

        return NextResponse.json(savedUser);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}