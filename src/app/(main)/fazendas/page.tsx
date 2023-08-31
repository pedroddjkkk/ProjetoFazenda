"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import { Cadastro } from "@/components";
import { Prisma } from "@prisma/client";
import { TableColumn } from "react-data-table-component";
import { useTabs } from "@/lib/stores";
import Lotes from "@/components/lotes";
import { FaEdit, FaList, FaPlus } from "react-icons/fa";

export default function Fazendas() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [id_fazenda, setIdFazenda] = useState("");
  const newTabs = useTabs((state) => state.setTabs);

  function getColumns(): TableColumn<Prisma.FazendaGetPayload<{}>>[] {
    return [
      { name: "Identificação", selector: (row) => row.id, width: "10%" },
      { name: "Nome", selector: (row) => row.name },
      { name: "Cnpj", selector: (row) => row.cnpj },
      { name: "Endereço", selector: (row) => row.endereco },
      { name: "Telefone", selector: (row) => row.telefone },
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="standard"
          />
          <TextField
            label="Cnpj"
            id="standard-start-adornment"
            className="col-sm-2"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <TextField
            label="Endereço"
            id="standard-start-adornment"
            className="col-sm-2"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <TextField
            label="telefone"
            id="standard-start-adornment"
            className="col-sm-2"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
        </div>
      </div>
    );
  }

  function getData() {
    return {
      name: nome,
      cnpj: cnpj,
      endereco: endereco,
      telefone: telefone,
    };
  }

  function clearData() {
    setNome("");
    setCnpj("");
    setEndereco("");
    setTelefone("");
  }

  function setData(data) {
    setNome(data.name);
    setCnpj(data.cnpj);
    setEndereco(data.endereco);
    setTelefone(data.telefone);
  }

  function onTableRowClick(e) {
    setIdFazenda(e.id);
    newTabs([
      { id: "Listar", name: "Listar", icon: <FaList /> },
      { id: "Adicionar", name: "Adicionar", icon: <FaPlus /> },
      { id: "Editar", name: "Editar", icon: <FaEdit /> },
    ]);
  }

  if (id_fazenda) {
    return <Lotes fazendaId={Number(id_fazenda)} />;
  } else {
    return (
      <Cadastro<Prisma.FazendaGetPayload<{}>>
        columns={getColumns()}
        addColumns={getAddColumns()}
        api="api/fazenda"
        getData={getData()}
        clearData={clearData}
        setDataProp={setData}
        tabTitle="Lista de Fazendas"
        onTableRowClick={onTableRowClick}
      />
    );
  }
}
