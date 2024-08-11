import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                identification: { label: "Identificación", type: "text", placeholder: "207060036" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    await connectDB();

                    const userFound = await User.findOne({ identification: credentials?.identification }).select("+password");

                    if (!userFound) throw new Error("Credenciales invalidos");

                    const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

                    if (!passwordMatch) throw new Error("Credenciales invalidos");

                    console.log(userFound);

                    return userFound;

                } catch (error) {
                    console.log(error)
                }
            }
        })

    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        session({ session, token }) {
            session.user = token.user as any;
            return session;
        }
    },
    pages: {
        signIn: "/login"
    }

});

export { handler as GET, handler as POST };