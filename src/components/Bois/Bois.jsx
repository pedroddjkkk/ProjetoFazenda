import Cadastro from "../Cadastro/Cadastro";

export default function Bois() {
  return <Cadastro 
    columns={["id_pk", "peso"]}
    table={"tab_bois"} 
  />;
}
