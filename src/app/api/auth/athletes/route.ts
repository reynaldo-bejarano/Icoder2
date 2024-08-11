// import { connectDB } from "@/libs/mongodb";
// import { NextResponse } from "next/server";
// import bcrypt from 'bcryptjs'
// import Athlete from "@/models/athlete";


// export async function GET() {
//     connectDB()
//     const athletesData = await Athlete.find();
//     console.log(athletesData)
//     return NextResponse.json({
//         athletesData
//     })
// }

// export async function POST(request: Request) {

//     const { identification, name, lastname1, lastname2, email, password, role, phone, rutine, nutrition, medical, data } = await request.json();

//     try {
//         await connectDB();
//         const athleteFound = await Athlete.findOne({ identification })

//         if (athleteFound) return NextResponse.json({
//             message: "Ese número de identificación ya existe en la base de datos"
//         }, {
//             status: 400,
//         });


//         const hashedPassword = await bcrypt.hash(password, 12);

//         const athlete = new Athlete({
//             identification,
//             name,
//             lastname1,
//             lastname2,
//             email,
//             password: hashedPassword,
//             role,
//             phone,
//             rutine,
//             nutrition,
//             medical,
//             data,
//         })

//         const saveAthlete = await athlete.save();
//         console.log(saveAthlete);

//         return NextResponse.json(saveAthlete);

//     } catch (error) {
//         console.log(error);
//         return NextResponse.error();
//     }

// }