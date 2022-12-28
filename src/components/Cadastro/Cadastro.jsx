import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import { apiBuscar, apiSalvar } from "../../services/api";
import TabContent from "../Tab/TabContent";
import BasicTable from "../Table/Table";

export default function Cadastro({ columns, table, addColumns, getData }) {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const selectedTab = useSelector((state) => state.tabs.selectedTab);
  const [data, setData] = useState();
  const [filtro, setFiltro] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const ret = await apiBuscar(table);
      setData(ret.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(newTabs([{ name: "Listar" }, { name: "Adicionar" }]));
  }, [data]);

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const ret = await apiBuscar(table, "", filtro);
      setData(ret.data);
    }
  }

  function onConfirm() {
    setData([...data, getData]);
    apiSalvar(table, "", getData);
    dispatch(selectTab("Listar"));
  }

  return (
    <div>
      <div>
        <ul className="nav nav-tabs" role="tablist">
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <li className="nav-item" role="presentation">
                  <a
                    className={
                      selectedTab == tab.name ? "nav-link active" : "nav-link"
                    }
                    role="tab"
                    data-bs-toggle="tab"
                    href="#tab-1"
                    onClick={() => dispatch(selectTab(tab.name))}
                  >
                    {tab.name}
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
                <TextField
                  onKeyDown={(e) => handleKeyDown(e)}
                  fullWidth
                  label="Filtro"
                  variant="standard"
                  style={{ marginTop: "20px" }}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <BasicTable cells={columns} rows={data} />
              </>
            }
          />
          <TabContent
            id="Adicionar"
            children={
              <div>
                {addColumns}
                <hr style={{ width: "95%", margin: "2% auto" }} />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="btn btn-danger"
                    style={{ margin: "0 30px 30px 0px" }}
                    onClick={() => dispatch(selectTab("Listar"))}
                  >
                    Cancelar <i class="fa-solid fa-times"></i>
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ margin: "0 30px 30px 0px" }}
                    onClick={onConfirm}
                  >
                    Confirmar <i class="fa-solid fa-check"></i>
                  </button>
                </Box>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
