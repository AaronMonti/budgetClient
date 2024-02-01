import axios from "axios";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = response.data;
    
    if (!refreshedTokens) {
      throw new Error("No refreshed tokens");
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
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
        if (user){
          return user
        }
        else{
          return null
        } 
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refreshToken = user.refreshToken;
        token.user = user;
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }: any) {
      session.user = token.user as any
      session.accessToken = token.accessToken as any
      return session
    }
  },
  session: {
    strategy: "jwt",
    jwt: true,
  },
  useRefreshTokens: true
}