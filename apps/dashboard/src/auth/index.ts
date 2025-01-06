import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserLogin } from "@/actions"

export const BASE_PATH = "/api/auth"

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: string | null;
  };
  sessionToken: string;
  expiresAt: string;
}

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<LoginResponse | null> {
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
