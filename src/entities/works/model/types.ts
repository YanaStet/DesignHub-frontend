import type { Tag } from "@/entities/tags/model";
import type { User } from "@/entities/users/model";

export type Work = {
  title: string;
  description: string;
  coverUrl: string;
  designUrl: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  author: User;
  tags: Tag[];
  isHidden: boolean
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
};

