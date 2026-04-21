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
    params?: WorkQueryParams,
  ): Promise<PaginationResponse<Work>> {
    const data = await api.get<PaginationResponse<Work>>(
      params
        ? `/designs/user/${userId}?${buildQueryParams(params)}`
        : `/designs/user/${userId}`,
    );
    return data;
  }
  async createWork(body: WorkRequest): Promise<Work> {
    const request = new FormData();
    request.append("title", body.title);
    request.append("description", body.description || "");
    request.append("coverImage", body.coverImage || "");
    request.append("designFile", body.designFile || "");
    request.append("tags", JSON.stringify(body.tags));
    const data = await api.post<Work>("/designs", request);
    return data;
  }
  async deleteWork(workId: string): Promise<Work> {
    const data = await api.delete<Work>(`/designs/delete-design/${workId}`);
    return data;
  }
  async updateWork(
    workId: string,
    body: Omit<WorkRequest, "coverImage" | "designFile">,
  ): Promise<Work> {
    const data = await api.put<Work>(`/designs/update/${workId}`, body);
    return data;
  }
  async viewWork(workId: string): Promise<string> {
    const data = await api.post<string>(`/designs/${workId}/view`);
    return data;
  }
  async updateCoverImg(workId: string, coverImage: File): Promise<Work> {
    const request = new FormData();
    request.append("coverImage", coverImage);
    const data = await api.put<Work>(
      `/designs/update-cover/${workId}`,
      request,
    );
    return data;
  }
  async updateContentImg(workId: string, designFile: File): Promise<Work> {
    const request = new FormData();
    request.append("designFile", designFile);
    const data = await api.put<Work>(`/designs/update-file/${workId}`, request);
    return data;
  }
  async getLikedWorksByDesignerId(
    designerId: string,
    params?: WorkQueryParams,
  ): Promise<PaginationResponse<Work>> {
    const data = await api.get<PaginationResponse<Work>>(
      params
        ? `/designs/liked-designs/${designerId}?${buildQueryParams(params)}`
        : `/designs/liked-designs/${designerId}`,
    );
    return data;
  }
  async banWork(workId: string, reason: string): Promise<Work> {
    const data = await api.put<Work>(`/designs/ban/${workId}`, {
      reason,
    });
    return data;
  }
}

export const workService = new WorkService();
