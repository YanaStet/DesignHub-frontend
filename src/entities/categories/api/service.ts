import { api } from "../../../shared/api";
import type { Category } from "../model";

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    const data = await api.get<Category[]>("/categories/");
    return data;
  }
  async createCategory(name: string): Promise<Category> {
    const data = await api.post<Category>("/categories/", { name });
    return data;
  }
}

export const categoryService = new CategoryService();
