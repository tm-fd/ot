
'use server'

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";



export async function getUserFromDb(email, password) {
  try {
    const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/auth_admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const user = await res.json();
    console.log("Reeeeeees",user)

    if (res.ok && user) {
      revalidatePath("/purchases");
      return user; // Must include at least an `id` field in the returned object
    }
    return null;
  
  } catch (err) {
    
  }

}