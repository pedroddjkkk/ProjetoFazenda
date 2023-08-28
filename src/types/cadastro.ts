import { Prisma } from "@prisma/client";
import { TableColumn } from "react-data-table-component";

export type CadastroProps<T extends Record<string, any>> = {
  columns: TableColumn<T>[];
  api: string;
  addColumns: React.ReactNode;
  getData: T | Record<string, any>;
  clearData: () => void;
  setDataProp: (data: T) => void;
  tabTitle: string;
};