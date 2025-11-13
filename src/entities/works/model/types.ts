import type { User } from "@/entities/users/model";

export type Work = {
  title: string;
  description: string | null;
  image_url: string | null;
  id: number;
  designer_id: number;
  upload_date: Date;
  views_count: number;
  designer: User;
  categories: {
    name: string;
    id: number;
  }[];
  tags: {
    name: string;
    id: number;
  }[];
};
