import api from "@/shared/api/api";

class ImageService {
  async postImage(body: File): Promise<{ file_url: string }> {
    const formData = new FormData();
    formData.append("file", body);
    const data = await api.post<{ file_url: string }>(
      "/upload/image/",
      formData
    );
    return data;
  }
}

export const imageService = new ImageService();
