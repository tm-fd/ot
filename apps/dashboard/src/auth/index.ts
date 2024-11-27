import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserFromDb } from "@/actions";
import { redirect } from 'next/navigation'


export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        // comment
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
      if (user) {
        token.accessToken = user.accessToken;
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