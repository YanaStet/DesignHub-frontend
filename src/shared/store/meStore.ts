import type { User } from "@/entities/users/model";
import { create } from "zustand";

type MeStore = {
  me: User | null;
};

type MeActions = {
  setMe: (me: User | null) => void;
};

export const useMe = create<MeStore & MeActions>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
}));
