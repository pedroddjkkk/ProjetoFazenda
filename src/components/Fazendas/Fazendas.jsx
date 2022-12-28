import { TextField } from "@mui/material";
import { useState } from "react";
import Cadastro from "../Cadastro/Cadastro";

export default function Fazendas() {
  const [nome, setNome] = useState();
  const [cnpj, setCnpj] = useState();
  const [endereco, setEndereco] = useState();
  const [telefone, setTelefone] = useState();

  function getColumns() {
    return [
      { name: "Identificação", field: "id_pk" },
      { name: "Nome", field: "nome" },
      { name: "Cnpj", field: "cnpj" },
      { name: "Endereço", field: "endereco" },
      { name: "Telefone", field: "telefone" },
    ];
  }

  function getAddColumns() {
    return (
      <div className="add-div-group container">
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

  function getData(){
    return {
      nome: nome,
      cnpj: cnpj,
      endereco: endereco,
      telefone: telefone
    }
  }

  function clearData(){
    setNome("");
    setCnpj("");
    setEndereco("");
    setTelefone("");
  }

  return <Cadastro 
    columns={getColumns()}
    addColumns={getAddColumns()}
    table="tab_fazendas"
    getData={getData()}
    clearData={clearData}
  />;
}
