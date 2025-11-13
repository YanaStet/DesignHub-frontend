import { api } from "../../../shared/api";
import type { Work } from "../model";

class WorkService {
  async getAllWorks(): Promise<Work[]> {
    const data = await api.get<Work[]>("/works/");
    return data;
  }
}

export const workService = new WorkService();
