import api from "@/shared/api/api";
import type { User, UserRequest } from "../model/types";

class UserService {
  async getAllUsers(): Promise<User[]> {
    const data = await api.get<User[]>("/users/");
    return data;
  }
  async createUser(body: UserRequest): Promise<User> {
    const data = await api.post<User>("/users/", body);
    return data;
  }
  async getMe(): Promise<User> {
    const data = await api.get<User>("/users/me");
    return data;
  }
  async getUserById(id: number): Promise<User> {
    const data = await api.get<User>(`/users/${id}`);
    return data;
  }
}

export const userService = new UserService();
