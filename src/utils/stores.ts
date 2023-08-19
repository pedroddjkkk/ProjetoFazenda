import { LoggedUser } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: LoggedUser | null;
  changeUser: (user: LoggedUser | null) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  changeUser: (user) => set((state) => ({ user: (state.user = user) })),
}));
