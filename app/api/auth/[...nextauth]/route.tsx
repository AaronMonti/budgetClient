import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "mail", type: "email", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
          email: credentials?.email,
          password: credentials?.password
        })
        const user = res.data
        if (user.message === "Credenciales invalidas") throw user

        return user
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user }
    },
    async session({ session, token }: any) {
      session.user = token as any
      return session
    }
  },
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }