
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
    console.log("Reeeeeees", user)

    if (res.ok && user) {
      revalidatePath("/purchases");
      return user; 
    }
    return null;
  
  } catch (err) {
    throw new Error(err)
  }

}

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    })
    console.log("RERERERERERERERERERERR",response)
    return response
  } catch (err) {
    throw new Error(err)
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/signin" });
}