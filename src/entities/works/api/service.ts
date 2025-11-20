import { buildQueryParams } from "@/shared/utils/query";
import { api } from "../../../shared/api";
import type { Work, WorkQueryParams } from "../model";

class WorkService {
  async getAllWorks(params: WorkQueryParams): Promise<Work[]> {
    const data = await api.get<Work[]>(`/works/?${buildQueryParams(params)}`);
    return data;
  }
  async getWorkById(workId: number): Promise<Work> {
    const data = await api.get<Work>(`/works/${workId}`);
    return data;
  }
}

export const workService = new WorkService();
