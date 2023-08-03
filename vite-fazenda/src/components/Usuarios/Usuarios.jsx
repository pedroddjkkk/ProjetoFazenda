import { TextField } from "@mui/material";
import { useState } from "react";
import Cadastro from "../Cadastro/Cadastro";

export default function Usuarios() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();

  function getColumns() {
    return [
      { name: "Identificação", selector: row => row.id_pk, sortable: true, width: "10%" },
      { name: "Email", selector: row => row.email, sortable: true },
      { name: "Login", selector: row => row.login },
      { name: "Nome", selector: row => row.nome },
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
            label="Email"
            id="standard-start-adornment"
            className="col-sm-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <TextField
            label="Login"
            id="standard-start-adornment"
            className="col-sm-2"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <TextField
            label="Senha"
            id="standard-start-adornment"
            className="col-sm-2"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
      email: email,
      login: login,
      senha: senha
    }
  }

  function clearData(){
    setNome("");
    setEmail("");
    setLogin("");
    setSenha("");
  }

  function setData(data){
    setNome(data.nome);
    setEmail(data.email);
    setLogin(data.login);
    setSenha(data.password);
  }

  return <Cadastro 
    columns={getColumns()}
    addColumns={getAddColumns()}
    table="tab_user"
    getData={getData()}
    clearData={clearData}
    setDataProp={setData}
    tabTitle="Lista de Usuários"
  />;
}
