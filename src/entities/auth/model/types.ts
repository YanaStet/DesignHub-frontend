import type { User } from "@/entities/users/model";

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = { message: string, user: User }