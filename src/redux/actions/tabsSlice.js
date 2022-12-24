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
            cells={["Name", "Proteina"]}
            rows={[
              { Name: "asd", Proteina: "fgh" },
              { Name: "dsada", Proteina: "dsafsdfs  " },
            ]}
          />
        ),
      },
      { name: "Adicionar", content: <h4>asdsad</h4> },
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
