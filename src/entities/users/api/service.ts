import api from "@/shared/api/api";
import type { PaginatedUsers, User, UserRequest } from "../model/types";
import { buildQueryParams } from "@/shared/utils/query";
import type { PaginationParams } from "@/shared/types";

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
  async getPaginatedUsers(params: PaginationParams): Promise<PaginatedUsers> {
    const data = await api.get<PaginatedUsers>(`/users/paginated?${buildQueryParams(params)}`);
    return data;
  }
  async banUser(id: string): Promise<User> {
    const data = await api.put<User>(`/users/${id}/ban`, {});
    return data;
  }
}

export const userService = new UserService();
