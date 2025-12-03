import { buildQueryParams } from "@/shared/utils/query";
import type { Work, WorkQueryParams, WorkRequest } from "../model";
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
  async createWork(body: WorkRequest): Promise<Work> {
    const data = await api.post<Work>("/works/", body);
    return data;
  }
  async deleteWork(workId: number): Promise<Work> {
    const data = await api.delete<Work>(`/works/${workId}`);
    return data;
  }
  async updateWork(workId: number, body: WorkRequest): Promise<Work> {
    const data = await api.put<Work>(`/works/${workId}`, body);
    return data;
  }
}

export const workService = new WorkService();
