import { Box, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import { apiBuscar } from "../../services/api";
import TabContent from "../Tab/TabContent";
import BasicTable from "../Table/Table";

export default function Cadastro({ columns, table, addColumns }) {
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
          <TabContent id="Adicionar" children={ addColumns } />
        </div>
      </div>
    </div>
  );
}
