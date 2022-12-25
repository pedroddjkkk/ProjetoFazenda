import { Box, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import { apiBuscar } from "../../services/api";
import BasicTable from "../Table/Table";

export default function Cadastro({ columns = [], table }) {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const selectedTab = useSelector((state) => state.tabs.selectedTab);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const ret = await apiBuscar(table);
      setData(ret.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(
      newTabs([
        {
          name: "Listar",
          content: <BasicTable cells={columns} rows={data} />,
        },
        { name: "Adicionar", content: <h4>asdsad</h4> },
      ])
    );
  }, [data]);

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

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
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <div
                  className={
                    selectedTab == tab.name
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }
                  role="tabpanel"
                  data-bs-parent="#myTabContent"
                > <Paper elevation={1} style={{borderRadius: 0, borderLeft: "1px solid #dddfeb"}}>
                    { selectedTab == "Listar" && <TextField fullWidth label="Filtro" variant="standard" style={{marginTop: "20px"}} />}
                    {tab.content}
                  </Paper>
                  
                  
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
