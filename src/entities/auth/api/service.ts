import { BASE_URL } from "@/shared/api/api";
import type { AuthRequest, AuthResponse } from "../model/types";

class AuthService {
  async login(body: AuthRequest): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append("username", body.username);
    formData.append("password", body.password);

    const response = await fetch(`${BASE_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${response.status} ${errorText}`);
    }

    const data: AuthResponse = await response.json();

    return data;
  }
}

export const authService = new AuthService();
