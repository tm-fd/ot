import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserLogin } from "@/actions"

export const BASE_PATH = "/api/auth"

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
        if (credentials === null) return null;
        const { email, password } = credentials
        try {
        const user = await getUserLogin(email as string, password as string)
        if (user) {
            return user;
        } else {
          throw new Error("User not found");
      }
      } catch (error) {
        throw new Error(error);
    }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {...token, ...session}
      }
      if (user) {
        if ('token' in user) {
          token.accessToken = user.token;
        }
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
