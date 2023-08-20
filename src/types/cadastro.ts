import { TableColumn } from "react-data-table-component";

export type CadastroProps<T extends Record<string, any>> = {
  columns: TableColumn<T>[];
  api: string;
  addColumns: React.ReactNode;
  getData: T;
  clearData: () => void;
  setDataProp: (data: T) => void;
};
