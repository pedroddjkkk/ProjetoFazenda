import {
  FaGaugeHigh,
  FaHouseUser,
  FaChartLine,
  FaLock,
  FaWheatAwn,
} from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";

export const pages = [
  {
    name: "Dashboard",
    path: "/",
    icon: FaGaugeHigh,
  },
  {
    name: "Usuários",
    path: "/users",
    icon: FaUserAlt,
  },
  {
    name: "Fazendas",
    path: "/fazendas",
    icon: FaHouseUser,
  },
  {
    name: "Rações",
    path: "/racoes",
    icon: FaWheatAwn,
  },
  {
    name: "Dieta",
    path: "/dieta",
    icon: GiMeal,
  },
  {
    name: "Acompanhar Bovinos",
    path: "/acompanhamento",
    icon: FaChartLine,
  },
  {
    name: "Permissões",
    path: "/permissoes",
    icon: FaLock,
  },
];
