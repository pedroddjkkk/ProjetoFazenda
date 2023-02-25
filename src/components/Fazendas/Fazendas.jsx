import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import Cadastro from "../Cadastro/Cadastro";
import TabContent from "../Tab/TabContent";

export default function Fazendas() {
  const [nome, setNome] = useState();
  const [cnpj, setCnpj] = useState();
  const [endereco, setEndereco] = useState();
  const [telefone, setTelefone] = useState();
  const [loteData, setLoteData] = useState([]);
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

  function onTableRowClick(e) {
    dispatch(
      newTabs([
        { name: "Lotes", icon: "fa-solid fa-list" },
        { name: "Editar", icon: "fa-solid fa-edit" },
      ])
    );
    setData(e);
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
            onRowClicked={onTableRowClick ? onTableRowClick : handleClickTable}
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
