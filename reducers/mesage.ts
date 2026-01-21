import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest, isLogined } from "@/utils/axios";

const initialState = {
  chats: [],
  loading: false,
  error: null,
  chatById: [],
  messages: [],
};

export const getChats = createAsyncThunk("chats/getChats", async () => {
  try {
    const { data } = await axiosRequest.get("/Chat/get-chats");
    return data;
  } catch (error) {
    isLogined(error);
    console.error(error);
  }
});

export const getChatById = createAsyncThunk(
  "chats/getChatById",
  async (chatId: number) => {
    try {
      const { data } = await axiosRequest.get(
        `/Chat/get-chat-by-id?chatId=${chatId}`,
      );
      return data;
    } catch (error) {
      isLogined(error);
      console.error(error);
    }
  },
);

export const deleteChatById = createAsyncThunk(
  "chats/deleteChatById",
  async (chatId: number) => {
    try {
      const { data } = await axiosRequest.delete(`/Chat/delete-chat?chatId=${chatId}`);
      return data;
    } 
    catch (error) {
      isLogined(error);
      console.error(error);
    }
  },
);

export const sendChatMessage = createAsyncThunk(
  "chats/sendChatMessage",
  async ({ chatId, message }: { chatId: number; message: string }) => {
    try {
      const formData = new FormData();
      formData.append("ChatId", String(chatId));
      formData.append("MessageText", message);         

      const { data } = await axiosRequest.put("/Chat/send-message", formData);
      return data;
    } catch (error) {
      isLogined(error);
      console.error(error);
    }
  }
);


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
    })
    .addCase(getChatById.pending, (state) => {
      state.loading = true;
    })
    .addCase(getChatById.fulfilled, (state, action) => {
      state.loading = false;
      state.chatById = action.payload.data;
    })
  
}
});

export default chatsSlice.reducer;
