import { CircularProgress, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import { apiBuscar, apiSalvar } from "../../services/api";
import exportToExcel from "../../utils/exportToExcel";
import Bois from "../Bois/Bois";
import Cadastro, {
  getTabContentAdicionar,
  getTabContentListar,
} from "../Cadastro/Cadastro";
import TabContent from "../Tab/TabContent";

export default function Fazendas() {
  const [nome, setNome] = useState();
  const [cnpj, setCnpj] = useState();
  const [endereco, setEndereco] = useState();
  const [telefone, setTelefone] = useState();
  const [loteData, setLoteData] = useState([]);
  const [id_fazenda, setIdFazenda] = useState();
  const [nomeLote, setNomeLote] = useState();
  const [boisData, setBoisData] = useState([]);
  const [idLote, setIdLote ] = useState();
  const [nomeLoteSelecionado, setNomeLoteSelecionado] = useState();
  const [progressPending, setProgressPending] = useState(true);
  const dispatch = useDispatch();

  const loteColumns = [
    { name: "Identificação", selector: (row) => row.id_pk, width: "10%" },
    { name: "Nome", selector: (row) => row.nome },
  ];

  const boisColumns = [
    {
      name: "Identificação",
      selector: (row) => row.id_pk,
      sortable: true,
      width: "10%",
    },
    {
      name: "Peso (Kg)",
      sortable: true,
      right: true,
      selector: (row) => row.peso,
      width: "100px",
    },
    { name: "Raça", selector: (row) => row.raca },
    { name: "Ração", selector: (row) => row.racao.nome },
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

  function getLoteAddColumns() {
    return (
      <div className="add-div-group">
        <div className="row">
          <TextField
            label="Nome do Lote"
            id="standard-start-adornment"
            className="col-sm-3"
            style={{ marginRight: "40px" }}
            value={nomeLote}
            onChange={(e) => setNomeLote(e.target.value)}
            variant="standard"
          />
        </div>
      </div>
    );
  }

  const actionsMemo = useMemo(
    () => (
      <>
        <Button
          className="btn"
          onClick={() => exportToExcel(loteColumns, loteData)}
        >
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

  function clearLoteData() {
    setNomeLote("");
  }

  async function getLotes(id_fazenda) {
    const res = await apiBuscar("tab_lotes", id_fazenda);
    setLoteData(res.data);
    setProgressPending(false);
    return res;
  }

  function onTableRowClick(e) {
    dispatch(
      newTabs([
        { id: "Lotes", name: "Lotes", icon: "fa-solid fa-list" },
        { id: "Incluir Lote", name: "Incluir Lote", icon: "fa-solid fa-plus" },
        { id: "Editar", name: "Editar", icon: "fa-solid fa-edit" },
      ])
    );
    setIdFazenda(e.id_pk);
    setData(e);
    getLotes(e.id_pk);
    dispatch(selectTab("Lotes"));
  }

  async function onLoteConfirm(e) {
    e.preventDefault();
    console.log("id_fazenda", id_fazenda);
    const ret = await apiSalvar("tab_lotes", "", {
      nome: nomeLote,
      id_fazenda: id_fazenda,
    });
    if (ret.status === 200) {
      toast.success("Salvo com sucesso!");
    } else {
      toast.error("Erro ao salvar!");
    }
    await getLotes(id_fazenda);
    dispatch(selectTab("Lotes"));
    clearLoteData();
  }

  async function getBois(id_lote) {
    const res = await apiBuscar("bois_lote", id_lote);
    setBoisData(res.data);
    setProgressPending(false);
    return res.data;
  }

  const onLoteClick = (e) => {
    getBois(e.id_pk);
    setIdLote(e.id_pk);
    setNomeLoteSelecionado(e.nome);
    dispatch(
      newTabs([
        { id: "Bois", name: "Bois", icon: "fa-solid fa-list" },
        { id: "incluirBoi", name: "Incluir Boi", icon: "fa-solid fa-plus" },
      ])
    );
    dispatch(selectTab("Bois"));
  };

  function getPropsNewTabs() {
    return (
      <>
        {getTabContentListar(
          loteData,
          loteColumns,
          onLoteClick,
          progressPending,
          actionsMemo,
          "Lotes",
          "Lista de Lotes"
        )}
        {getTabContentAdicionar(
          onLoteConfirm,
          getLoteAddColumns(),
          dispatch,
          () => {
            clearLoteData();
            dispatch(selectTab("Lotes"));
          },
          "Incluir Lote"
        )}
        {/*  {getTabContentListar(
          boisData,
          boisColumns,
          () => {},
          false,
          null,
          "Bois",
          "Lista de Bois no " + nomeLoteSelecionado
        )} */}
        {/* <TabContent id={"Bois"} component={<Bois />} /> */}
        {getTabContentAdicionar(
          onLoteConfirm,
          getLoteAddColumns(),
          dispatch,
          () => {
            dispatch(selectTab("Bois"));
          },
          "Incluir Lote"
        )}
      </>
    );
  }
  if(idLote){
    return (
      <Bois />
    )
  } else {
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
}
