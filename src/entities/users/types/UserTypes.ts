export type Role = "User" | "Moder" | "Admin";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  registration_date: Date;
};
