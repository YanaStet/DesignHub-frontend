import api from "@/shared/api/api";
import type { AuthRequest, AuthResponse } from "../model/types";

class AuthService {
  async login(body: AuthRequest): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/login", body);
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  }
}

export const authService = new AuthService();
