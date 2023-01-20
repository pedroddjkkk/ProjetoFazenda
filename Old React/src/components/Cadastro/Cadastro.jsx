import { Box, TextField } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import { apiBuscar, apiExcluir, apiSalvar } from "../../services/api";
import exportToExcel from "../../utils/exportToExcel";
import fadeIn from "../../utils/fadeIn";
import TabContent from "../Tab/TabContent";

export default function Cadastro({
  columns,
  table,
  addColumns,
  getData,
  clearData,
  setDataProp,
}) {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const selectedTab = useSelector((state) => state.tabs.selectedTab);
  const [data, setData] = useState();
  const fadeInRef = useRef(null);
  const [filtro, setFiltro] = useState();
  const [selectedId, setSelectedId] = useState();

  const reloadData = async () => {
    const ret = await apiBuscar(table);
    setData(ret.data);
  };

  useEffect(() => {
    fadeIn(fadeInRef.current);
    reloadData();
  }, []);

  useEffect(() => {
    dispatch(
      newTabs([
        { name: "Listar", icon: "fa-solid fa-list" },
        { name: "Adicionar", icon: "fa-solid fa-plus" },
      ])
    );
    dispatch(selectTab("Listar"));
  }, [data]);

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const ret = await apiBuscar(table, "", filtro);
      setData(ret.data);
    }
  }

  async function onConfirm(e) {
    e.preventDefault();
    const ret = await apiSalvar(table, selectedId ? selectedId : "", getData);
    if (ret.status === 200) {
      toast.success("Salvo com sucesso!");
    } else {
      toast.error("Erro ao salvar!");
    }
    await reloadData();
    dispatch(selectTab("Listar"));
    clearData();
  }

  async function handleClickTable(e) {
    dispatch(newTabs([{ name: "Editar", icon: "fa-solid fa-edit" }]));
    dispatch(selectTab("Editar"));
    setSelectedId(e.id_pk);
    setDataProp(e);
  }

  async function onDelete(e) {
    await apiExcluir(table, selectedId);
    await reloadData();
    dispatch(
      newTabs([
        { name: "Listar", icon: "fa-solid fa-list" },
        { name: "Adicionar", icon: "fa-solid fa-plus" },
      ])
    );
    dispatch(selectTab("Listar"));
    clearData();
  }

  const actionsMemo = useMemo(
    () => (
      <Button className="btn" onClick={() => exportToExcel(columns, data)}>
        Exportar
      </Button>
    ),
    [data]
  );

  return (
    <div className="cadastro-main-div" ref={fadeInRef}>
      <div>
        <ul className="nav nav-tabs" role="tablist">
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <li className="nav-item" role="presentation">
                  <a
                    className={
                      selectedTab === tab.name ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    href="#tab-1"
                    onClick={() => dispatch(selectTab(tab.name))}
                  >
                    <i class={tab.icon && tab.icon}></i>
                    {" " + tab.name}
                  </a>
                </li>
              );
            })}
        </ul>
        <div className="tab-content">
          <TabContent
            id="Listar"
            children={
              <>
                <DataTable
                  columns={columns}
                  data={data}
                  title="Lista de registros"
                  onRowClicked={handleClickTable}
                  pagination
                  highlightOnHover
                  pointerOnHover
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  actions={actionsMemo}
                />
              </>
            }
          />
          <TabContent
            id="Adicionar"
            children={
              <form onSubmit={onConfirm}>
                <div>
                  {addColumns}
                  <hr
                    style={{
                      width: "95%",
                      margin: "2% auto",
                      backgroundColor: "black",
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-danger"
                      style={{ margin: "0 30px 30px 0px" }}
                      onClick={() => dispatch(selectTab("Listar"))}
                    >
                      <i class="fa-solid fa-times" /> Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ margin: "0 30px 30px 0px" }}
                    >
                      <i class="fa-solid fa-check" /> Confirmar
                    </button>
                  </Box>
                </div>
              </form>
            }
          />
          <TabContent
            id="Editar"
            children={
              <form onSubmit={onConfirm}>
                <div>
                  {addColumns}
                  <hr
                    style={{
                      width: "95%",
                      margin: "2% auto",
                      backgroundColor: "black",
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-danger"
                      style={{ margin: "0 30px 30px 0px" }}
                      onClick={() => {
                        dispatch(
                          newTabs([
                            { name: "Listar", icon: "fa-solid fa-list" },
                            { name: "Adicionar", icon: "fa-solid fa-plus" },
                          ])
                        );
                        clearData();
                        dispatch(selectTab("Listar"));
                      }}
                    >
                      <i class="fa-solid fa-times" /> Cancelar
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ margin: "0 30px 30px 0px" }}
                      onClick={onDelete}
                    >
                      <i class="fa-solid fa-trash" /> Deletar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ margin: "0 30px 30px 0px" }}
                    >
                      <i class="fa-solid fa-check" /> Confirmar
                    </button>
                  </Box>
                </div>
              </form>
            }
          />
        </div>
      </div>
    </div>
  );
}
