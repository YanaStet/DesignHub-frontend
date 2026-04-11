import api from "@/shared/api/api";
import type { LikeResponse, ToggleLikeResponse } from "../model";

class LikeService {
  async getLikesByDesignId(designId: string): Promise<LikeResponse> {
    const data = await api.get<LikeResponse>(`/likes/${designId}`);
    return data;
  }
  async toggleLike(designId: string): Promise<ToggleLikeResponse> {
    const data = await api.post<ToggleLikeResponse>(`/likes/${designId}`);
    return data;
  }
}

export const likeService = new LikeService();
