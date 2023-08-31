"use client";
import { TextField } from "@mui/material";
import { Cadastro } from "..";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Prisma } from "@prisma/client";
import axios from "axios";

export default function Lotes({
  lotes,
  fazenda,
}: {
  lotes: Prisma.LoteGetPayload<{}>[];
  fazenda: Prisma.FazendaGetPayload<{}>;
}) {
  const [nome, setNome] = useState("");
  const [idLote, setIdLote] = useState("");

  const columns: TableColumn<Prisma.LoteGetPayload<{}>>[] = [
    { name: "Identificação", selector: (row) => row.id, width: "10%" },
    { name: "Nome", selector: (row) => row.name },
  ];

  function getAddColumns() {
    return (
      <div className="add-div-group">
        <div className="row">
          <TextField
            label="Nome do Lote"
            id="standard-start-adornment"
            className="col-sm-3"
            style={{ marginRight: "40px" }}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="standard"
          />
        </div>
      </div>
    );
  }

  function getData() {
    return {
      name: nome,
      fazendaId: fazenda.id,
    };
  }

  function clearData() {
    setNome("");
  }

  function setData(data) {
    setNome(data.nome);
  }

  function onTableRowClick(row) {
    setIdLote(row.id);
    setNome(row.name);
  }

  /*   if (idLote) {
    return <Bois fk={idLote} />;
  } else { */
  return (
    <Cadastro<Prisma.LoteGetPayload<{}>>
      columns={columns}
      api="api/lote"
      addColumns={getAddColumns()}
      tabTitle="Lista de Lotes"
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
      initialData={lotes}
      onTableRowClick={onTableRowClick}
    />
  );
  /*   } */
}
