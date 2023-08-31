"use client";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Cadastro } from "@/components";
import { Prisma } from "@prisma/client";
import { TableColumn } from "react-data-table-component";

export default function Racoes() {
  const [name, setName] = useState("");

  function getColumns(): TableColumn<Prisma.RacaoGetPayload<{}>>[] {
    return [
      { name: "Identificação", selector: (row) => row.id, width: "10%" },
      { name: "Nome", selector: (row) => row.name },
    ];
  }

  function getAddColumns() {
    return (
      <div className="add-div-group">
        <div className="row">
          <TextField
            label="Nome"
            id="standard-start-adornment"
            className="col-sm-3"
            style={{ marginRight: "40px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
          />
        </div>
      </div>
    );
  }

  function getData() {
    return {
      name: name,
    };
  }

  function clearData() {
    setName("");
  }

  function setData(data) {
    setName(data.name);
  }

  return (
    <Cadastro<Prisma.RacaoGetPayload<{}>>
      columns={getColumns()}
      api="/api/racao"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
      tabTitle="Lista de Rações"
    />
  );
}
