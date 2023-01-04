import Cadastro from "../Cadastro/Cadastro";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css"
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ComboEdit from "../ComboEdit/ComboEdit";

export default function Bois() {
  const [peso, setPeso] = useState();
  const [raca, setRaca] = useState();
  const [id_racao, setId_racao] = useState();

  function getColumns() {
    return [
      { name: "Identificação", field: "id_pk" },
      { name: "Peso (Kg)", field: "peso" },
      { name: "Raça", field: "raca" },
      { name: "Ração", field: {parent: "racao", name: "nome"} },
    ];
  }

  function getComboColumns() {
    return [
      { name: "Identificação", field: "id_pk" },
      { name: "Nome", field: "nome" },
    ];
  }

  useEffect(() => {
    console.log(id_racao);
  }, [id_racao]);

  function getAddColumns() {
    return (
      <div className="add-div-group container">
        <div className="row">
          <TextField
            label="Peso"
            id="standard-start-adornment"
            className="col-sm-2"
            style={{ marginRight: "40px" }}
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">kg</InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            label="Raça"
            id="standard-start-adornment"
            className="col-sm-2"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <ComboEdit
            label="Ração"
            tabela="tab_racoes"
            setValue={setId_racao}
            value={id_racao}
            className="col-sm-2"
            columns={getComboColumns()}
          />
        </div>
      </div>
    );
  }

  function getData(){
    return {
      peso: peso,
      raca: raca,
      id_racao: id_racao
    }
  }

  function clearData(){
    setPeso("");
    setRaca("");
    setId_racao("");
  }

  function setData(data){
    console.log(data);
    setPeso(data.peso);
    setRaca(data.raca);
    setId_racao(data.id_racao);
  }

  return (
    <Cadastro
      columns={getColumns()}
      table="tab_bois"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
    />
  );
}
