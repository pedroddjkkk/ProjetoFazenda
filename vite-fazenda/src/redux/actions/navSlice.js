import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    tabs: null,
  },
  reducers: {
    selectNavTabs: (state, { payload }) => {
      return [...payload];
    },
  },
});

export const { selectNavTabs } = navSlice.actions;

export default navSlice.reducer;
