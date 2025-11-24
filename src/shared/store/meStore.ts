import type { User } from "@/entities/users/model";
import { create } from "zustand";

type MeStore = {
  me: User | null;
  avatar_url?: string;
};

type MeActions = {
  setMe: (me: User | null) => void;
  setAvatarUrl: (avatar_url: string) => void;
};

export const useMe = create<MeStore & MeActions>((set) => ({
  me: null,
  avatar_url: undefined,
  setMe: (me) => set({ me }),
  setAvatarUrl: (avatar_url) => set({ avatar_url }),
}));
