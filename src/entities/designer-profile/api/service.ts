import api from "@/shared/api/api";
import type { DesignerProfile, DesignerProfileRequest } from "../model";

class DesignerProfileService {
  async getDesignerProfileById(id: string): Promise<DesignerProfile> {
    const data = await api.get<DesignerProfile>(`/designer-profiles/${id}`);
    return data;
  }
  async getMyDesignerProfile(): Promise<DesignerProfile> {
    const data = await api.get<DesignerProfile>(`/designer-profiles/me`);
    return data;
  }
  async updateMyDesignerProfile(
    body: DesignerProfileRequest
  ): Promise<DesignerProfile> {
    const request = new FormData();
    if (body.bio) request.append("bio", body.bio);
    if (body.specialization) request.append("specialization", body.specialization);
    if (body.experience) request.append("experience", body.experience.toString());
    if (body.avatar) request.append("avatar", body.avatar);
    if (body.header) request.append("header", body.header);

    const data = await api.post<DesignerProfile>(`/designer-profiles`, request);
    return data;
  }
}

export const designerProfileService = new DesignerProfileService();
