import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest, isLogined } from "@/utils/axios";

const initialState = {
  chats: [],
  loading: false,
  error: null,
};

export const getChats = createAsyncThunk("chats/getChats", async () => {
  try {
    const { data } = await axiosRequest.get("/Chat/get-chats");
    return data;
  } 
  catch (error) {
    isLogined(error); 
    console.error(error);
  }
});

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      });
  },
});

export default chatsSlice.reducer;
