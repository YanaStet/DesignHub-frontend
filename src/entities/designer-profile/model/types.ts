export type DesignerProfile = {
  _id: string;
  specialization: string | null;
  experience: number | null;
  bio: string | null;
  header_image: string | null;
  avatar: string | null;
  user: string;
};

export type DesignerProfileRequest = {
  specialization: string | null;
  bio: string | null;
  experience: number;
  avatar: File | null;
  header: File | null;
};
