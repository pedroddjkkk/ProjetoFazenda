import * as React from "react";

export default function BasicTable({ cells, rows }) {
  return (
    <table
      id="example"
      class="table table-striped table-bordered"
      cellspacing="0"
      width="100%"
    >
      <thead>
        <tr>
          {cells && cells.map((cell, index) => {
            return <th key={index}>{cell.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows && rows.map((row, index) => {
          return (
            <tr key={index}>
              {cells && cells.map((cell, indexc) => {
                return <td key={indexc}>{row[cell.field]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
