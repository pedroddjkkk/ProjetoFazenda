import { TextField } from "@mui/material";
import Cadastro from "../Cadastro/Cadastro";
import { useState } from "react";
import api, { apiBuscar } from "../../services/api";
import Bois from "../Bois/Bois";

export default function Lotes( props ){
  const [nome, setNome] = useState();
  const [idLote, setIdLote] = useState();

  const columns = [
    { name: "Identificação", selector: (row) => row.id_pk, width: "10%" },
    { name: "Nome", selector: (row) => row.nome },
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
      nome: nome,
      id_fazenda: props.fk,
    };
  }

  function clearData() {
    setNome("");
  }

  function setData(data) {
    setNome(data.nome);
  }

  async function fetchData(){
    const ret = await api.get("tab_lotes", props.fk);
    return ret;
  }

  function onTableRowClick(row){
    setIdLote(row.id_pk);
    setNome(row.nome);
  }

  if(idLote){
    return (
      <Bois fk={idLote} />
    );
  } else {
    return (
      <Cadastro
        columns={columns}
        table="tab_lotes"
        addColumns={getAddColumns()}
        tabTitle="Lista de Lotes"
        getData={getData()}
        clearData={clearData} 
        setDataProp={setData}
        fetchData={fetchData}
        onTableRowClick={onTableRowClick}
      />
    );
  }
}