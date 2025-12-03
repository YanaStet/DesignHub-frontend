import type { Category } from "@/entities/categories/model";
import type { Tag } from "@/entities/tags/model";
import type { User } from "@/entities/users/model";

export type Work = {
  title: string;
  description: string | null;
  image_url: string | null;
  id: number;
  designer_id: number;
  upload_date: string;
  views_count: number;
  designer: User;
  categories: Category[];
  tags: Tag[];
};

export type WorkQueryParams = {
  limit: number | null;
  skip: number | null;
  categories: string[] | null;
  tags: string[] | null;
  q: string | null;
};

export type WorkRequest = {
  title: string;
  description: string | null;
  image_url: string | null;
  categories_ids: number[];
  tags_names: string[];
};
