import * as React from "react";
import "./Table.css"

export default function BasicTable({ cells, rows, onClick }) {
  return (
    <table
      id="example"
      class="table table-bordered"
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
            <tr className="table-content" onClick={onClick ? onClick : ""}>
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
