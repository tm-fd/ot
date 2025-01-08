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
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
        const userData = await getUserLogin(email, password);

        if (!userData || !userData.user) {
          return null;
        }

        // Check if email is verified
        if (!userData.user.emailVerified) {
          return null;
        }

        return userData.user;
      } catch (error) {
        console.error('Auth error:', error);
        return null;
      }
      }
    })
  ],
  pages: {  
    signIn: "/signin",
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
