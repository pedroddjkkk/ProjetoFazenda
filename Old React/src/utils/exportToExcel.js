import * as XLSX from 'xlsx';

export default function exportToExcel(columns, data) {
  const headers = columns.map(column => column.name);
  const selectors = columns.map(column => column.selector);

  const rows = data.map(row => selectors.map(selector => {
    if (typeof selector === "function") {
      return selector(row);
    }
    const keyChain = selector.split(".");
    let currentValue = row;
    keyChain.forEach(key => {
      currentValue = currentValue[key];
    });
    return currentValue;
  }));

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Tabela");
  XLSX.writeFile(wb, "dados.xlsx");
}
