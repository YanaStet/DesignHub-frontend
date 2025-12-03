import api from "@/shared/api/api";
import type { DesignerProfile, DesignerProfileRequest } from "../model";

class DesignerProfileService {
  async getDesignerProfileById(id: number): Promise<DesignerProfile> {
    const data = await api.get<DesignerProfile>(`/profiles/${id}`);
    return data;
  }
  async getMyDesignerProfile(): Promise<DesignerProfile> {
    const data = await api.get<DesignerProfile>(`/profiles/me`);
    return data;
  }
  async updateMyDesignerProfile(
    body: DesignerProfileRequest
  ): Promise<DesignerProfile> {
    const data = await api.put<DesignerProfile>(`/profiles/me`, body);
    return data;
  }
  async updateMyAvatar(body: File): Promise<DesignerProfile> {
    const formData = new FormData();
    formData.append("file", body);
    const data = await api.post<DesignerProfile>(
      "/profiles/me/avatar",
      formData
    );
    return data;
  }
  async updateMyHeader(body: File): Promise<DesignerProfile> {
    const formData = new FormData();
    formData.append("file", body);
    const data = await api.post<DesignerProfile>(
      "/profiles/me/header-image",
      formData
    );
    return data;
  }
}

export const designerProfileService = new DesignerProfileService();
