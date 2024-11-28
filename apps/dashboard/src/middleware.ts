import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { BASE_PATH } from "@/auth";


const { auth } = NextAuth(authConfig);

import {PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES} from "@/lib/routes";

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  console.log("XOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOOXOXOXOXOO",isAuthenticated, nextUrl.pathname);

  const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

  console.log("isPublicRoute", isPublicRoute, PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

  if (!isAuthenticated && !isPublicRoute) return NextResponse.redirect(new URL(LOGIN, nextUrl));

  // if (isAuthenticated) return NextResponse.redirect(new URL(ROOT, nextUrl));
  
}




export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/(tr|en)/:path*']
};
