"use client";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
console.log("SESESESESESESESESESESES",session);
  return session?.user ? (
    <Button
      onClick={async () => {
        await signOut({ redirectTo: "/" });
      }}
    >
      {session.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={() => router.push("/signin")}>Sign In</Button>
  );
}