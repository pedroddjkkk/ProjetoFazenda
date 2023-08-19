import { Prisma } from "@prisma/client";
import { create } from "zustand";

type UserWithoutPassword = Prisma.UserGetPayload<{
  select: {
    email: true;
    login: true;
    id: true;
    password: true;
  };
}> | null;

interface UserStore {
  user: UserWithoutPassword;
  changeUser: (user: UserWithoutPassword) => void;
}

export const useCounter = create<UserStore>((set) => ({
  user: null,
  changeUser: (user) => set((state) => ({ user: (state.user = user) })),
}));
