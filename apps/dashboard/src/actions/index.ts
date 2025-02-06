'use server'
import { signIn, signOut } from "@/auth";
import * as bcrypt from 'bcryptjs';

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

async function loginRequest(email: string, password: string): Promise<LoginResponse | null> {
  try {
    const res = await fetch(`${process.env.CLOUDRUN_DEV_URL}/auth_admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Login request failed:', error);
    return null;
  }
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Get user data from API
    const loginResponse = await loginRequest(email, password);
    console.log("loginResponse",loginResponse)
    if (!loginResponse) {
      return { error: "Invalid credentials" };
    }

    if (!loginResponse.user.emailVerified) {
      return { error: "Please verify your email before logging in" };
    }

    // 2. Create session with NextAuth
    const userData = {
      ...loginResponse.user,
      sessionExpires: loginResponse.expiresAt,
      sessionToken: loginResponse.sessionToken
    };

    const authResponse = await signIn("credentials", {
      redirect: false,
      userData: JSON.stringify(userData),
    });

    if (authResponse?.error) {
      return { error: authResponse.error };
    }

    return {
      success: true,
      data: userData
    };

  } catch (error) {
    console.error('Login error:', error);
    return { error: "An error occurred during login" };
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

