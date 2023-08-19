import {
  FaGaugeHigh,
  FaHouseUser,
  FaUtensils,
  FaChartLine,
  FaLock,
} from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

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
    icon: FaUtensils,
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
