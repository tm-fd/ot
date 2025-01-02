
'use server'

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import * as bcrypt from 'bcrypt';



export async function getUserLogin(email, password) {
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
    return response
  } catch (err) {
    console.error(err)
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/signin" });
}


export async function registerUser({ email, password, name, role }) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/auth_admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: hashedPassword,
        name,
        role
      }),
    });
    

    const createdAccount = await res.json();
    console.log(createdAccount, res.ok)
    if (!res.ok) {
      return { error: createdAccount.error.message || 'Registration failed' };
    }
    return { data: createdAccount };
  } catch (err) {
    return { error: err.message || 'Registration failed' };
  }

}

