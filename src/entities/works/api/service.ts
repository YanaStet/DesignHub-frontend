import { buildQueryParams } from "@/shared/utils/query";
import type { Work, WorkQueryParams, WorkRequest } from "../model";
import api from "@/shared/api/api";
import type { PaginationResponse } from "@/shared/types/auth";

class WorkService {
  async getPaginatedWorks(
    params: WorkQueryParams,
  ): Promise<PaginationResponse<Work>> {
    const data = await api.get<PaginationResponse<Work>>(
      `/designs?${buildQueryParams(params)}`,
    );
    return data;
  }
  async getWorkById(workId: string): Promise<Work> {
    const data = await api.get<Work>(`/designs/${workId}`);
    return data;
  }
  async getWorksByDesignerId(
    userId: string,
    params?: Omit<WorkQueryParams, "limit" | "skip">,
  ): Promise<Work[]> {
    const data = await api.get<Work[]>(
      params
        ? `/designs/user/${userId}?${buildQueryParams(params)}`
        : `/designs/user/${userId}`,
    );
    return data;
  }
  async createWork(body: WorkRequest): Promise<Work> {
    const data = await api.post<Work>("/designs/", body);
    return data;
  }
  async deleteWork(workId: string): Promise<Work> {
    const data = await api.delete<Work>(`/designs/${workId}`);
    return data;
  }
  async updateWork(workId: string, body: WorkRequest): Promise<Work> {
    const data = await api.put<Work>(`/designs/${workId}`, body);
    return data;
  }
  async viewWork(workId: string): Promise<string> {
    const data = await api.post<string>(`/designs/${workId}/view`);
    return data;
  }
}

export const workService = new WorkService();
