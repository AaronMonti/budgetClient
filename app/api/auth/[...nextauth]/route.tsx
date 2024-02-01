import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth"


export const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }