export type Role = "user" | "moderator" | "admin";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  avatar: string;
};

export type UserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
};
