import { TableColumn } from "react-data-table-component";

export type ComboEditProps<T extends Record<string, any>> = {
  apiUrl: string;
  label: string;
  columns: TableColumn<T>[];
  className?: string;
  setValue: (value: string) => void;
  value: string;
};
