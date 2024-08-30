import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Athlete from "@/models/athlete";

export async function POST(request: Request) {
  const {
    identification,
    name,
    lastname1,
    lastname2,
    email,
    password,
    role,
    birth,
    genre,
    phone,
    address,
    activity,
    active,
  } = await request.json();

  try {
    await connectDB();
    const athleteFound = await Athlete.findOne({ identification });

    if (athleteFound)
      return NextResponse.json(
        {
          message: "Ese atleta ya existe en la base de datos",
        },
        {
          status: 400,
        }
      );
    console.log(identification);
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 12);

    const athlete = new Athlete({
      identification,
      name,
      lastname1,
      lastname2,
      email,
      password: hashedPassword,
      role,
      genre,
      birth: new Date(birth).toISOString(),
      phone,
      address,
      activity,
      active,
    });

    const saveAthlete = await athlete.save();
    console.log(saveAthlete);

    return NextResponse.json(saveAthlete);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
