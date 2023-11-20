import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/db/dbConfig";
connect()

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "test@example.com" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
                let email = credentials.email
                let password = credentials.password
                if(!email || !password){
                    throw new Error("Please Provide email and password.")
                }

                if(email != "admin@acropolis.in" || password != "12345678") {
                    throw new Error("Invalid Credentials, please try again.")
                }
                                
                return {
                    name: "Ajay Sir",
                    email: "admin@acropolis.in",
                }
          }
        }),
    ],
    session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }