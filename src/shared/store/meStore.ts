import type { User, UserProfile } from "@/entities/users/model";
import { create } from "zustand";

type MeStore = {
  me: User | null;
  avatar_url?: string;
  myProfile: UserProfile | null;
};

type MeActions = {
  setMe: (me: User | null) => void;
  setAvatarUrl: (avatar_url: string | undefined) => void;
  setDesignerProfile: (profile: UserProfile | null) => void;
};

export const useMe = create<MeStore & MeActions>((set) => ({
  me: null,
  avatar_url: undefined,
  myProfile: null,
  setMe: (me) => set({ me }),
  setAvatarUrl: (avatar_url) => set({ avatar_url }),
  setDesignerProfile: (profile) => set({ myProfile: profile }),
}));
