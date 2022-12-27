import Cadastro from "../Cadastro/Cadastro";

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
      <div>
        <div className="form-group">
          <label htmlFor="peso">Peso (Kg)</label>
          <input type="number" className="form-control" id="peso" />
        </div>
        <div className="form-group">
          <label htmlFor="raca">Raça</label>
          <input type="text" className="form-control" id="raca" />
        </div>
      </div>
    );
  }

  return <Cadastro 
    columns={getColumns()}
    table="tab_bois"
    addColumns={getAddColumns()}
  />;
}
