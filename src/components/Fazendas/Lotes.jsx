import Cadastro from "../Cadastro/Cadastro";

export default function Lotes(){
  const [nome, setNome] = useState();

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
    };
  }

  function clearData() {
    setNome("");
  }

  function setData(data) {
    setNome(data.nome);
  }

  return (
    <Cadastro
      columns={columns}
      table="tab_lotes"
      addColumns={getAddColumns()}
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
    />
  );
}