import { buildQueryParams } from "@/shared/utils/query";
import type { Work, WorkQueryParams } from "../model";
import api from "@/shared/api/api";

class WorkService {
  async getAllWorks(params: WorkQueryParams): Promise<Work[]> {
    const data = await api.get<Work[]>(`/works/?${buildQueryParams(params)}`);
    return data;
  }
  async getWorkById(workId: number): Promise<Work> {
    const data = await api.get<Work>(`/works/${workId}`);
    return data;
  }
  async getWorksByDesignerId(
    userId: number,
    params?: Omit<WorkQueryParams, "limit" | "skip">
  ): Promise<Work[]> {
    const data = await api.get<Work[]>(
      params
        ? `/works/by-designer/${userId}?${buildQueryParams(params)}`
        : `/works/by-designer/${userId}`
    );
    return data;
  }
}

export const workService = new WorkService();
