import { BASE_URL } from "@/shared/api/api";
import type { AuthRequest, AuthResponse } from "../model/types";

class AuthService {
  async login(body: AuthRequest): Promise<AuthResponse> {
    const requestBody = {
      email: body.username,
      password: body.password,
    };

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${response.status} ${errorText}`);
    }

    const data: AuthResponse = await response.json();

    return data;
  }

  async logout(): Promise<void> {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  }
}

export const authService = new AuthService();
