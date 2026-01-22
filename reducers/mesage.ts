import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest, isLogined } from "@/utils/axios";

const initialState = {
  chats: [],
  loading: false,
  error: null,
  chatById: [],
  messages: [],
  data: [],
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

export const getUsers = createAsyncThunk("chats/getUsers", async () => {
  try {
    const { data } = await axiosRequest.get("/User/get-users");
    return data.data;
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
      const { data } = await axiosRequest.delete(
        `/Chat/delete-chat?chatId=${chatId}`,
      );
      return { data, chatId };
    } catch (error) {
      isLogined(error);
      console.error(error);
      throw error;
    }
  },
);

export const sendChatMessage = createAsyncThunk(
  "chats/sendChatMessage",
  async (
    {
      chatId,
      message,
      file,
    }: {
      chatId: number;
      message?: string;
      file?: File;
    },
    { dispatch },
  ) => {
    try {
      const formData = new FormData();
      formData.append("ChatId", String(chatId));

      if (message) {
        formData.append("MessageText", message);
      }

      if (file) {
        formData.append("File", file);
      }

      await axiosRequest.put("/Chat/send-message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(getChatById(chatId));
    } catch (error) {
      isLogined(error);
      console.error(error);
    }
  },
);

export const deleteMessage = createAsyncThunk(
  "chats/deleteMessage",
  async (messageId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.delete(
        `/Chat/delete-message?massageId=${messageId}`,
      );

      if (data.data === false) {
        return rejectWithValue("Не удалось удалить сообщение");
      }

      return messageId;
    } catch (error) {
      isLogined(error);
      return rejectWithValue(error.message);
    }
  },
);

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    clearActiveChat: (state) => {
      state.chatById = [];
    },
  },
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
        if (action.payload?.data) {
          state.chatById = action.payload.data.reverse();
        }
      })
      .addCase(deleteChatById.fulfilled, (state, action) => {
        const deletedChatId = action.payload?.chatId;

        if (deletedChatId) {
          if (state.chats?.data) {
            state.chats.data = state.chats.data.filter(
              (chat: any) =>
                chat.chatId !== deletedChatId && chat.id !== deletedChatId,
            );
          }

          if (state.chatById.length > 0) {
            const firstMessage = state.chatById[0];
            if (firstMessage && firstMessage.chatId === deletedChatId) {
              state.chatById = [];
            }
          }
        }
      })
      .addCase(deleteChatById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.chatById = state.chatById.filter(
          (msg: any) => msg.messageId !== deletedId,
        );
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearActiveChat } = chatsSlice.actions;
export default chatsSlice.reducer;
