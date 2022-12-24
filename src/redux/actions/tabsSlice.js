import { createSlice } from "@reduxjs/toolkit";
import BasicTable from "../../components/Table/Table";
import TableComponent from "../../components/Table/Table";

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    selectedTab: "Listar",
    tabs: [
      {
        name: "Listar",
        content: (
          <BasicTable
            cells={["name", "Proteina"]}
            rows={[
              { name: "asd", Proteina: "sd" },
              { name: "dsada", Proteina: "dsafsdfs  " },
            ]}
          />
        ),
      },
      { name: "Cadastrar", content: <h4>asdsad</h4> },
    ],
  },
  reducers: {
    newTabs: (state, { payload }) => {
      return { ...state, tabs: [...payload] };
    },
    removeTabs: (state, { payload }) => {
      return { ...state, tabs: [...payload] };
    },
    selectTab: (state, { payload }) => {
      return { ...state, selectedTab: payload };
    },
  },
});

export const { newTabs, removeTabs, selectTab } = tabsSlice.actions;

export default tabsSlice.reducer;
