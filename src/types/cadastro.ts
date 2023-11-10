import { AxiosPromise } from "axios";
import { TableColumn } from "react-data-table-component";
import { Control } from "react-hook-form";

export type CadastroProps<T extends Record<string, any>> = {
  columns: TableColumn<T>[];
  api: string;
  addColumns: React.ReactNode;
  getData: T | Record<string, any>;
  clearData: () => void;
  setDataProp: (data: T) => void;
  tabTitle: string;
  editBottom?: React.ReactNode;
  propsNewTabs?: React.ReactNode;
  onTableRowClick?: (row: T, e: MouseEvent) => void;
  fetchData?: () => any;
  onSelectItem?: (id: number) => void;
};

export type getTabContentAdicionarProps = {
  onConfirm: (event: React.FormEvent<HTMLFormElement>) => void;
  addColumns: React.ReactNode;
  selectTab: (name: string) => void;
  onCancel?: () => void;
  tabName?: string;
};
