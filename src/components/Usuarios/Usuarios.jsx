import Cadastro from "../Cadastro/Cadastro";

export default function Usuarios() {

  function getColumns() {
    return [
      { name: "Identificação", field: "id_pk" },
      { name: "Email", field: "email" },
      { name: "Login", field: "login" },
    ];
  }

  return <Cadastro 
    columns={getColumns()}
    table="tab_user"
  />;
}
