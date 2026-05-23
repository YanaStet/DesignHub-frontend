import type { UserProfile } from "@/entities/users/model";

// Re-export UserProfile as DesignerProfile for backward compatibility
export type DesignerProfile = UserProfile;

export type DesignerProfileRequest = {
  specialization: string | null;
  bio: string | null;
  experience: number;
  avatar: File | null;
  header: File | null;
};
