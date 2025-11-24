export type DesignerProfile = {
  specialization: string | null;
  experience: number | null;
  bio: string | null;
  header_image_url: string | null;
  avatar_url: string | null;
  designer_id: number;
  rating: number;
  views_count: number;
  work_amount: number;
};

export type DesignerProfileRequest = {
  specialization: string | null;
  bio: string | null;
  experience: number;
};
