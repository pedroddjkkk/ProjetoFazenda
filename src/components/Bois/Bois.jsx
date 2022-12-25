import Cadastro from "../Cadastro/Cadastro";

export default function Bois() {

  function getColumns() {
    return [
      { name: "Identificação", field: "id_pk" },
      { name: "Peso (Kg)", field: "peso" },
      { name: "Raça", field: "raca" },
    ];
  }

  return <Cadastro 
    columns={getColumns()}
    table="tab_bois"
  />;
}
