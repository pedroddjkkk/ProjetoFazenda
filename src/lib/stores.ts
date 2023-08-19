import { FaList, FaPlus } from "react-icons/fa";
import { LoggedUser } from "@/types/user";
import { Tab } from "@/types/tabs";
import { create } from "zustand";

interface UserStore {
  user: LoggedUser | null;
  changeUser: (user: LoggedUser | null) => void;
}

interface TabsStore {
  tabs: Tab[];
  selectedTab: string;
  setTabs: (tabs: Tab[]) => void;
  selectTab: (tab: string) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: {
    email: "",
    login: "",
    id: 0,
    token: "",
    name: "Pedro Valério",
  },
  changeUser: (user) => set((state) => ({ user: (state.user = user) })),
}));

export const useTabs = create<TabsStore>((set) => ({
  tabs: [
    { id: "Listar", name: "Listar", icon: FaList },
    { id: "Adicionar", name: "Adicionar", icon: FaPlus },
  ],
  selectedTab: "Listar",
  setTabs: (tabs) => set((state) => ({ tabs: (state.tabs = tabs) })),
  selectTab: (tab) =>
    set((state) => ({ selectedTab: (state.selectedTab = tab) })),
}));
