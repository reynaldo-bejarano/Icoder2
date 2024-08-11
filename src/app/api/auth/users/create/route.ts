import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/models/user";

export async function POST(request: Request) {

    const { identification, name, lastname1, lastname2, email, password, role, birth, phone, address, active } = await request.json();

    try {
        await connectDB();
        const userFound = await User.findOne({ identification })

        if (userFound) return NextResponse.json({
            message: "Ese usuario ya existe en la base de datos"
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
            birth: new Date(birth).toISOString(),
            phone,
            address,
            active
        })

        const saveUser = await user.save();
        console.log(saveUser);

        return NextResponse.json(saveUser);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}