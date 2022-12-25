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
          {cells && cells.map((cell) => {
            return <th>{cell}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows && rows.map((row) => {
          return (
            <tr>
              {cells && cells.map((cell) => {
                return <td>{row[cell]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
