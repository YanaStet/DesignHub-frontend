export type DesignerProfile = {
  specialization: string | null;
  experience: number | null;
  bio: string | null;
  header_image_url: string | null;
  avatar: string | null;
  user: string;
};

export type DesignerProfileRequest = {
  specialization: string | null;
  bio: string | null;
  experience: number;
};
