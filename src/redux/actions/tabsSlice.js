import { createSlice } from "@reduxjs/toolkit";
import BasicTable from "../../components/Table/Table";
import TableComponent from "../../components/Table/Table";

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    selectedTab: "Listar",
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
