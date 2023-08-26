import {createSlice} from "@reduxjs/toolkit";
import {getStudentstList} from "./actions";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const studenSlice = createSlice({
  name: "students",
  initialState,
  extraReducers: {
    [getStudentstList.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudentstList.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getStudentstList.rejected]: (state, {payload}) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default studenSlice.reducer;
