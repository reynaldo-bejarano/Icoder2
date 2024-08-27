import { connectDB } from "@/libs/mongodb";
import Athlete from "@/models/athlete";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        connectDB()
        const limonCount = await Athlete.countDocuments({
            'address.canton_id': 1
        });
        const pocociCount = await Athlete.countDocuments({
            'address.canton_id': 2
        });
        const siquirresCount = await Athlete.countDocuments({
            'address.canton_id': 3
        });
        const talamancaCount = await Athlete.countDocuments({
            'address.canton_id': 4
        });
        const guacimoCount = await Athlete.countDocuments({
            'address.canton_id': 5
        });
        const voleibolCount = await Athlete.countDocuments({
            'activity.sport_id': 1
        });
        const natacionCount = await Athlete.countDocuments({
            'activity.sport_id': 2
        });
        const baloncestoCount = await Athlete.countDocuments({
            'activity.sport_id': 3
        });
        const futbolCount = await Athlete.countDocuments({
            'activity.sport_id': 4
        });
        const rugbyCount = await Athlete.countDocuments({
            'activity.sport_id': 5
        });
        const ciclismoCount = await Athlete.countDocuments({
            'activity.sport_id': 6
        });
        const taekwondoCount = await Athlete.countDocuments({
            'activity.sport_id': 7
        });
        const atletismoCount = await Athlete.countDocuments({
            'activity.sport_id': 8
        });
        const judoCount = await Athlete.countDocuments({
            'activity.sport_id': 9
        });
        const gimnasiaCount = await Athlete.countDocuments({
            'activity.sport_id': 10
        });




        return NextResponse.json({
            limonCount, pocociCount, siquirresCount, talamancaCount, guacimoCount,
            voleibolCount, natacionCount, baloncestoCount, futbolCount, rugbyCount,
            ciclismoCount, taekwondoCount, atletismoCount, judoCount, gimnasiaCount
        })

    } catch (error) {
        return NextResponse.json({
            error: 'Error al obtener el total de usuarios'
        }, { status: 500 });
    }


}