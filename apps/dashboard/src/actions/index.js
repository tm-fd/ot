
'use server'

import { signIn, signOut } from "@/auth";
import * as bcrypt from 'bcryptjs';


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
      return user;
    }
    return null;
  
  } catch (err) {
    throw new Error(err)
  }

}

export async function doCredentialLogin(formData) {
  try {
    const userData = await getUserLogin(
      formData.get("email"),
      formData.get("password")
    );

    if (!userData) {
      return {
        error: "Invalid credentials"
      };
    }

    if (!userData.user.emailVerified) {
      return {
        error: "Please check your email to verify it before logging in"
      };
    }

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      userData: JSON.stringify(userData.user),
    });

    if (response.error) {
      return {
        error: response.error
      };
    }
    return {
      success: true,
      data: userData
    };
  } catch (err) {
    console.error(err);
    return {
      error: "An error occurred during login"
    };
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

export async function resendVerificationEmail(email) {
  try {
    const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/auth_admin/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || 'Failed to resend verification email' };
    }

    return { success: true, message: data.message };
  } catch (err) {
    return { error: 'An error occurred while resending verification email' };
  }
}

