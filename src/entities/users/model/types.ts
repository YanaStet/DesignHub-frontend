export type Role = "designer" | "moderator" | "admin";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  registration_date: Date;
};
