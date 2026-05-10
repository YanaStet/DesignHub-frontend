import type { PaginationResponse } from "@/shared/types";

export type Role = "user" | "moderator" | "admin";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
};

export type UserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type PaginatedUsers = PaginationResponse<User>;
