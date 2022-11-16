import { createSlice } from "@reduxjs/toolkit";

// redux to switch to sorted products
const initialState = {
  isSort: false,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sort: (state) => {
      state.isSort = true;
    },
    unSort: (state) => {
      state.isSort = false;
    },
  },
});

export default sortSlice.reducer;
export const { sort, unSort } = sortSlice.actions;
