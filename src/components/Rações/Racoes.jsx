import { TextField } from "@mui/material";
import { useState } from "react";
import Cadastro from "../Cadastro/Cadastro";

export default function Racoes() {
  const [nome, setNome] = useState();

  function getColumns() {
    return [
      { name: "Identificação", selector: row => row.id_pk },
      { name: "Nome", selector: row => row.nome },
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
        </div>
      </div>
    );
  }

  function getData() {
    return {
      nome: nome,
    };
  }

  function clearData() {
    setNome("");
  }

  function setData(data) {
    setNome(data.nome);
  }

  return (
    <Cadastro
      columns={getColumns()}
      table="tab_racoes"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
    />
  );
}
