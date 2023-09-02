import { TableColumn } from "react-data-table-component";

export type ComboEditProps<T extends Record<string, any>> = {
  apiUrl: string;
  label: string;
  columns: TableColumn<T>[];
  className?: string;
  setValue: (row: T) => void;
  setTextValue?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
};
