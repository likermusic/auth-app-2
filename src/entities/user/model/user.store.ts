import { create } from "zustand";
import type { IUserPublic } from "../types";

interface IUserStore {
  user: IUserPublic | null;
  setUser: (user: IUserPublic) => void;
  signoutUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: { id: user.id, email: user.email } }),
  signoutUser: () => set({ user: null }),
}));
