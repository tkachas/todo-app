import { createSlice } from "@reduxjs/toolkit";

export const toDoSlice = createSlice({
  name: "todo",
  initialState: {
    currentTab: "To do",
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = toDoSlice.actions;

export default toDoSlice.reducer;
