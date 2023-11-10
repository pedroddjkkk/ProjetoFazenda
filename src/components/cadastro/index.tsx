import { Box, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useTabs } from "@/lib/stores";
import { toast } from "react-toastify";
import {
  FaCheck,
  FaEdit,
  FaList,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { fadeIn } from "@/utils/fade";
import exportToExcel from "@/utils/xlsx";
import { TabContent } from "..";
import axios from "axios";
import { CadastroProps, getTabContentAdicionarProps } from "@/types/cadastro";
import { SubmitHandler } from "react-hook-form";

export default function Cadastro<T extends Record<string, any>>({
  columns,
  api,
  addColumns,
  getData,
  clearData,
  setDataProp,
  editBottom,
  propsNewTabs,
  onTableRowClick,
  fetchData,
  onSelectItem,
  tabTitle
}: CadastroProps<T>) {
  const tabs = useTabs((state) => state.tabs);
  const selectedTab = useTabs((state) => state.selectedTab);
  const setTabs = useTabs((state) => state.setTabs);
  const selectTab = useTabs((state) => state.selectTab);
  const [data, setData] = useState([]);
  const fadeInRef = useRef(null);
  const [progressPending, setProgressPending] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const reloadData = async () => {
    if (fetchData) {
      const res = await fetchData();
      setProgressPending(false);
      setData(res.data);
      return;
    }
    const res = await axios.get(api);
    console.log("responda", res);

    setProgressPending(false);
    setData(res.data);
  };

  useEffect(() => {
    fadeIn(fadeInRef);
    reloadData();
  }, []);

  useEffect(() => {
    setTabs([
      { id: "Listar", name: "Listar", icon: <FaList /> },
      { id: "Adicionar", name: "Adicionar", icon: <FaPlus /> },
    ]);
    selectTab("Listar");
  }, [data]);

  useEffect(() => {
    if (selectedTab === "Adicionar") {
      clearData();
      setSelectedId(null);
    }
  }, [selectedTab]);

  async function onConfirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let res;
    if (selectedId) {
      res = await axios.put(api + "/" + selectedId, getData);
    } else {
      res = await axios.post(api, getData);
    }
    if (res.status === 200) {
      toast.success("Salvo com sucesso!");
    } else {
      toast.error("Erro ao salvar!");
    }
    await reloadData();
    selectTab("Listar");
    clearData();
  }

  const handleClickTable = useCallback(
    async (e) => {
      setTabs([{ id: "Editar", name: "Editar", icon: <FaEdit /> }]);
      selectTab("Editar");
      setSelectedId(e.id);
      setDataProp(e);

      if (onSelectItem) onSelectItem(e.id);
    },
    [setTabs, setSelectedId, setDataProp, selectTab]
  );

  const onTableRowClickMemo = useCallback(onTableRowClick, [onTableRowClick]);

  async function onDelete() {
    await axios.delete(api + "/" + selectedId);
    await reloadData();
    setTabs([
      { id: "Listar", name: "Listar", icon: <FaList /> },
      { id: "Adicionar", name: "Adicionar", icon: <FaPlus /> },
    ]);

    selectTab("Listar");
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
                    onClick={() => selectTab(tab.id)}
                  >
                    <div className="flex items-center">
                      {tab.icon && tab.icon}
                      <span className="ml-1">{" " + tab.name}</span>
                    </div>
                  </a>
                </li>
              );
            })}
        </ul>
        {getTabContentListar({
          data,
          columns,
          handleClickTable: onTableRowClick
            ? onTableRowClickMemo
            : handleClickTable,
          progressPending,
          actionsMemo,
          tabName: "Listar",
          tabTitle: tabTitle ? tabTitle : "Lista de Registros",
        })}
        <div className="tab-content">
          {getTabContentAdicionar({ onConfirm, addColumns, selectTab })}
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
                        setTabs([
                          { id: "Listar", name: "Listar", icon: <FaList /> },
                          {
                            id: "Adicionar",
                            name: "Adicionar",
                            icon: <FaPlus />,
                          },
                        ]);

                        clearData();
                        selectTab("Listar");
                      }}
                    >
                      <div className="flex items-center">
                        <FaTimes />
                        <span className="ml-1">Cancelar</span>
                      </div>
                    </button>
                    <button
                      className="btn btn-danger btn-cadastro-edit"
                      onClick={onDelete}
                    >
                      <div className="flex items-center">
                        <FaTrash />
                        <span className="ml-1">Deletar</span>
                      </div>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-cadastro-edit"
                    >
                      <div className="flex items-center">
                        <FaCheck />
                        <span className="ml-1">Confirmar</span>
                      </div>
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

export function getTabContentListar({
  data,
  columns,
  handleClickTable,
  progressPending,
  actionsMemo,
  tabName,
  tabTitle,
}: any) {
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
            keyField="id"
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
        </>
      }
    />
  );
}

export function getTabContentAdicionar({
  onConfirm,
  addColumns,
  selectTab,
  onCancel,
  tabName,
}: getTabContentAdicionarProps) {
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
                onClick={onCancel ? onCancel : () => selectTab("Listar")}
              >
                <div className="flex items-center">
                  <FaTimes />
                  <span className="ml-1">Cancelar</span>
                </div>
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ margin: "0 30px 30px 0px" }}
              >
                <div className="flex items-center">
                  <FaCheck />
                  <span className="ml-1">Confirmar</span>
                </div>
              </button>
            </Box>
          </div>
        </form>
      }
    />
  );
}
