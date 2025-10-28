import { api } from "../../../shared/api";
import type { User } from "../types/UserTypes";

class UserService {
  async getAllUsers(): Promise<User[]> {
    const data = await api.get<User[]>("/users/");
    return data;
  }
}

export const userService = new UserService();
