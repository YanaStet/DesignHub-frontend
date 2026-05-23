import type { PaginationResponse } from "@/shared/types";

export type Role = "user" | "moderator" | "admin";

export type SocialLink = {
  platform: string;
  url: string;
};

export type UserProfile = {
  bio: string | null;
  specialization: string | null;
  experience: number | null;
  avatar: string | null;
  header_image: string | null;
  social_links: SocialLink[];
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
  profile: UserProfile | null;
};

export type UserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type PaginatedUsers = PaginationResponse<User>;
