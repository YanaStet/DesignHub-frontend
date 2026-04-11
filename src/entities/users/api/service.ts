import api from "@/shared/api/api";
import type { User, UserRequest } from "../model/types";

class UserService {
  async getAllUsers(): Promise<User[]> {
    const data = await api.get<User[]>("/users/");
    return data;
  }
  async createUser(body: UserRequest): Promise<User> {
    const data = await api.post<User>("/auth/register", body);
    return data;
  }
  async getMe(): Promise<User> {
    const data = await api.get<User>("/users/me");
    return data;
  }
  async getUserById(id: string): Promise<User> {
    const data = await api.get<User>(`/users/${id}`);
    return data;
  }
}

export const userService = new UserService();
