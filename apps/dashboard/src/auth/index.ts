import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserFromDb } from "@/actions";
import { redirect } from 'next/navigation'


export const BASE_PATH = "/api/auth";

export interface User {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  token?: string | null
}


const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials
        console.log('credentials', credentials)
        const user = await getUserFromDb(email as string, password as string)
        console.log('Data', user)
        if (user) {
          return user as User
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {...token, ...session}
      }
      console.log("USUSUSUSUSUSUSUSUSUSUSUSU",user)
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {  
    signIn: "/signin",
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);