import { CircularProgress, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import { apiBuscar } from "../../services/api";
import exportToExcel from "../../utils/exportToExcel";
import Cadastro from "../Cadastro/Cadastro";
import TabContent from "../Tab/TabContent";

export default function Fazendas() {
  const [nome, setNome] = useState();
  const [cnpj, setCnpj] = useState();
  const [endereco, setEndereco] = useState();
  const [telefone, setTelefone] = useState();
  const [loteData, setLoteData] = useState([]);
  const [id_fazenda, setIdFazenda] = useState();
  const [progressPending, setProgressPending] = useState(true);
  const dispatch = useDispatch();

  const loteColumns = [
    { name: "Identificação", selector: (row) => row.id_pk, width: "10%" },
    { name: "Nome", selector: (row) => row.nome },
  ];

  function getColumns() {
    return [
      { name: "Identificação", selector: (row) => row.id_pk, width: "10%" },
      { name: "Nome", selector: (row) => row.nome },
      { name: "Cnpj", selector: (row) => row.cnpj },
      { name: "Endereço", selector: (row) => row.endereco },
      { name: "Telefone", selector: (row) => row.telefone },
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
            label="Cnpj"
            id="standard-start-adornment"
            className="col-sm-2"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <TextField
            label="Endereço"
            id="standard-start-adornment"
            className="col-sm-2"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
          <TextField
            label="telefone"
            id="standard-start-adornment"
            className="col-sm-2"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            style={{ marginRight: "40px" }}
            variant="standard"
          />
        </div>
      </div>
    );
  }

  const actionsMemo = useMemo(
    () => (
      <>
        <Button className="btn" onClick={() => exportToExcel(loteColumns, loteData)}>
          Exportar
        </Button>
      </>
    ),
    [loteData]
  );

  function getData() {
    return {
      nome: nome,
      cnpj: cnpj,
      endereco: endereco,
      telefone: telefone,
    };
  }

  function clearData() {
    setNome("");
    setCnpj("");
    setEndereco("");
    setTelefone("");
  }

  function setData(data) {
    setNome(data.nome);
    setCnpj(data.cnpj);
    setEndereco(data.endereco);
    setTelefone(data.telefone);
  }

  async function getLotes(){
    const res = await apiBuscar("tab_lotes", id_fazenda, "");
    setLoteData(res.data);
    setProgressPending(false);
    return res;
  }

  function onTableRowClick(e) {
    dispatch(
      newTabs([
        { name: "Lotes", icon: "fa-solid fa-list" },
        { name: "Incluir Lote", icon: "fa-solid fa-plus"},
        { name: "Editar", icon: "fa-solid fa-edit" },
      ])
    );
    setIdFazenda(e.id_pk);
    setData(e);
    getLotes()
    dispatch(selectTab("Lotes"));
  }

  function getPropsNewTabs() {
    return (
      <TabContent
        id="Lotes"
        component={
          <DataTable
            columns={loteColumns}
            data={loteData}
            title="Lista de Lotes"
            /* onRowClicked={handleClickTable} */
            pagination
            keyField="id_pk"
            paginationComponentOptions={{
              rowsPerPageText: "Registros por paginas:",
              rangeSeparatorText: "de",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
            highlightOnHover
            pointerOnHover
            progressPending={progressPending}
            progressComponent={
              <div style={{ padding: "40px 0 40px 0" }}>
                <CircularProgress />
              </div>
            }
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            actions={actionsMemo}
            noDataComponent={
              <span style={{ padding: "20px 0 40px 0" }}>
                Sem dados para a tabela
              </span>
            }
          />
        }
      />
    );
  }
  return (
    <Cadastro
      columns={getColumns()}
      addColumns={getAddColumns()}
      table="tab_fazendas"
      getData={getData()}
      clearData={clearData}
      setDataProp={setData}
      onTableRowClick={onTableRowClick}
      propsNewTabs={getPropsNewTabs()}
    />
  );
}
