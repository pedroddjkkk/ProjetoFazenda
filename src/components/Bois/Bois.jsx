import Cadastro from "../Cadastro/Cadastro";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css"
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function Bois() {
  const [peso, setPeso] = useState();
  const [raca, setRaca] = useState();

  function getColumns() {
    return [
      { name: "Identificação", field: "id_pk" },
      { name: "Peso (Kg)", field: "peso" },
      { name: "Raça", field: "raca" },
    ];
  }

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
        </div>
      </div>
    );
  }

  function getData(){
    return {
      peso: peso,
      raca: raca
    }
  }

  function clearData(){
    setPeso("");
    setRaca("");
  }

  function setData(data){
    setPeso(data.peso);
    setRaca(data.raca);
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
