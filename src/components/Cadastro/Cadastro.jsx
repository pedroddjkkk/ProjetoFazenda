import { Box, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  editBottom,
  propsNewTabs,
  onTableRowClick,
  fetchData,
}) {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const selectedTab = useSelector((state) => state.tabs.selectedTab);
  const [data, setData] = useState("");
  const fadeInRef = useRef(null);
  const [progressPending, setProgressPending] = useState(true);
  const [selectedId, setSelectedId] = useState("");

  const reloadData = async () => {
    if(fetchData){
      const ret = await fetchData();
      setProgressPending(false);
      setData(ret.data);
      return;
    }
    const ret = await apiBuscar(table);
    setProgressPending(false);
    setData(ret.data);
  };

  useEffect(() => {
    fadeIn(fadeInRef.current);
    reloadData();
  }, []);

  useEffect(() => {
    dispatch(
      newTabs([
        { id: "Listar", name: "Listar", icon: "fa-solid fa-list" },
        { id: "Adicionar", name: "Adicionar", icon: "fa-solid fa-plus" },
      ])
    );
    dispatch(selectTab("Listar"));
  }, [data]);

  useEffect(() => {
    if (selectedTab === "Adicionar") {
      clearData();
      setSelectedId(null);
    }
  }, [selectedTab]);

  /*  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const ret = await apiBuscar(table, "", filtro);
      setData(ret.data);
    }
  } */

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

  const handleClickTable = useCallback(async (e) => {
    dispatch(newTabs([{ id: "Editar", name: "Editar", icon: "fa-solid fa-edit" }]));
    dispatch(selectTab("Editar"));
    setSelectedId(e.id_pk);
    setDataProp(e);
  }, [dispatch, setSelectedId, setDataProp]);

  const onTableRowClickMemo = useCallback(onTableRowClick, [onTableRowClick]);

  async function onDelete(e) {
    await apiExcluir(table, selectedId);
    await reloadData();
    dispatch(
      newTabs([
        { id: "Listar", name: "Listar", icon: "fa-solid fa-list" },
        { id: "Adicionar", name: "Adicionar", icon: "fa-solid fa-plus" },
      ])
    );
    dispatch(selectTab("Listar"));
    clearData();
  }

  const actionsMemo = useMemo(
    () => (
      <>
        <Button className="btn" onClick={() => exportToExcel(columns, data)}>
          Exportar
        </Button>
      </>
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
                <li className="nav-item" role="presentation" key={index}>
                  <a
                    className={
                      selectedTab === tab.id ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    href="#tab-1"
                    onClick={() => dispatch(selectTab(tab.id))}
                  >
                    <i className={tab.icon && tab.icon}></i>
                    {" " + tab.name}
                  </a>
                </li>
              );
            })}
        </ul>
        {getTabContentListar(
          data,
          columns,
          onTableRowClickMemo ? onTableRowClickMemo : handleClickTable,
          progressPending,
          actionsMemo
        )}
        <div className="tab-content">
          {getTabContentAdicionar(onConfirm, addColumns, dispatch)}
          <TabContent
            id="Editar"
            component={
              <form onSubmit={onConfirm}>
                <div
                  className="add-section"
                  style={{ margin: "0 auto", width: "95%" }}
                >
                  {addColumns}
                  <hr
                    style={{
                      marginTop: "2%",
                      backgroundColor: "black",
                    }}
                  />
                  <div className="edit-buttons">
                    <button
                      className="btn btn-danger btn-cadastro-edit"
                      onClick={() => {
                        dispatch(
                          newTabs([
                            { id: "Listar", name: "Listar", icon: "fa-solid fa-list" },
                            { id: "Adicionar", name: "Adicionar", icon: "fa-solid fa-plus" },
                          ])
                        );
                        clearData();
                        dispatch(selectTab("Listar"));
                      }}
                    >
                      <i className="fa-solid fa-times" /> Cancelar
                    </button>
                    <button
                      className="btn btn-danger btn-cadastro-edit"
                      onClick={onDelete}
                    >
                      <i className="fa-solid fa-trash" /> Deletar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-cadastro-edit"
                    >
                      <i className="fa-solid fa-check" /> Confirmar
                    </button>
                  </div>
                  {editBottom}
                </div>
              </form>
            }
          />
          {propsNewTabs}
        </div>
      </div>
    </div>
  );
}

export function getTabContentListar(
  data,
  columns,
  handleClickTable,
  progressPending,
  actionsMemo,
  tabName,
  tabTitle
) {
  return (
    <TabContent
      id={tabName ? tabName : "Listar"}
      component={
        <>
          <DataTable
            columns={columns}
            data={data}
            title={tabTitle ? tabTitle : "Lista de registros"}
            onRowClicked={handleClickTable}
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
            progresssComponent={
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
        </>
      }
    />
  );
}

export function getTabContentAdicionar(onConfirm, addColumns, dispatch, onCancel, tabName ) {
  return (
    <TabContent
      id={tabName ? tabName : "Adicionar"}
      component={
        <form onSubmit={onConfirm}>
          <div>
            <div
              className="add-section"
              style={{ margin: "0 auto", width: "95%" }}
            >
              {addColumns}
              <hr
                style={{
                  backgroundColor: "black",
                  marginTop: "2%",
                }}
              />
            </div>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn btn-danger"
                style={{ margin: "0 30px 30px 0px" }}
                onClick={onCancel ? onCancel : () => dispatch(selectTab("Listar"))}
              >
                <i className="fa-solid fa-times" /> Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ margin: "0 30px 30px 0px" }}
              >
                <i className="fa-solid fa-check" /> Confirmar
              </button>
            </Box>
          </div>
        </form>
      }
    />
  );
}
