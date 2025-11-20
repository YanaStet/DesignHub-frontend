import api from "@/shared/api/api";
import type { Tag } from "../model";

class TagService {
  async getAllTags(): Promise<Tag[]> {
    const data = await api.get<Tag[]>("/tags/");
    return data;
  }
  async createTag(name: string): Promise<Tag> {
    const data = await api.post<Tag>("/tags/", { name });
    return data;
  }
}

export const tagService = new TagService();
