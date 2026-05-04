import api from "@/shared/api/api";
import type { AuthRequest, AuthResponse } from "../model/types";

class AuthService {
  async login(body: AuthRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/login", body);
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  }

  async googleLogin(idToken: string): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/google', { token: idToken });
  }
}

export const authService = new AuthService();
