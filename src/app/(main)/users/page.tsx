"use client";
import { Cadastro } from "@/components";
import { TextField } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";

export default function Usuarios() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const columns: TableColumn<Prisma.UserGetPayload<{}>>[] = [
    {
      name: "Identificação",
      selector: (row) => row.id,
      sortable: true,
      width: "10%",
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Login", selector: (row) => row.login ?? "" },
    { name: "Nome", selector: (row) => row.name },
  ];

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

  function getData() {
    return {
      name: nome,
      email: email,
      login: login,
      password: senha,
    };
  }

  function clearData() {
    setNome("");
    setEmail("");
    setLogin("");
    setSenha("");
  }
  
  return (
    <Cadastro<Prisma.UserGetPayload<{}>>
      columns={columns}
      addColumns={getAddColumns()}
      api="api/user"
      getData={getData()}
      clearData={clearData}
      setDataProp={(data) => {
        setNome(data.name);
        setEmail(data.email);
        setLogin(data.login ?? "");
        setSenha(data.password);
      }}
      tabTitle="Lista de Usuários"
    />
  );
}
