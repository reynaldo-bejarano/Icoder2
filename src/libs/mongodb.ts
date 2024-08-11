import mongoose from 'mongoose'
import { NextResponse } from 'next/server';

const conn = {
    isConnected: false,
}

export const connectDB = async () => {

    const { MONGODB_URI2 } = process.env;

    if (!MONGODB_URI2) {
        throw new Error('MongoDB_URI2 debería estar definido');
    }

    try {

        if (conn.isConnected) return;
        const { connection } = await mongoose.connect(MONGODB_URI2);


        if (connection.readyState === 1) {
            console.log("MongoDB conectado");
            conn.isConnected = true
            return Promise.resolve(true);
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            }, {
                status: 400,
            })
        }
    }

}