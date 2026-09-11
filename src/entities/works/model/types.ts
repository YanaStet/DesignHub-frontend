import type { Tag } from "@/entities/tags/model";
import type { User } from "@/entities/users/model";

export type DesignFileType = 'image' | 'video' | 'psd' | 'ai' | 'figma' | 'sketch' | 'pdf' | 'other';

export type DesignFile = {
  url: string;
  fileType: DesignFileType;
  originalName?: string;
  fileSize?: number;
  mimeType?: string;
  cloudinaryResourceType?: 'image' | 'video' | 'raw';
  figmaUrl?: string;
};

export type Work = {
  title: string;
  description: string;
  coverUrl: string;
  designUrl: string;
  designFile?: DesignFile;
  _id: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  author: User;
  tags: Tag[];
  isHidden: boolean;
  likesCount: number;
};

export type WorkQueryParams = {
  limit: number | null;
  page: number | null;
  tags: string[] | null;
  q: string | null;
};

export type WorkRequest = {
  title: string;
  description: string | null;
  coverImage: File | null;
  designFile: File | null;
  tags: string[];
  figmaUrl?: string;
};

