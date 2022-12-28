import Cadastro from "../Cadastro/Cadastro";
import "../../App.css";
import "../../assets/bootstrap/css/bootstrap.min.css"
import { InputAdornment, TextField } from "@mui/material";

export default function Bois() {
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
            style={{ marginRight: "40px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">kg</InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
      </div>
    );
  }

  return (
    <Cadastro
      columns={getColumns()}
      table="tab_bois"
      addColumns={getAddColumns()}
    />
  );
}
