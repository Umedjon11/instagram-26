import { chatsSlice } from "@/reducers/mesage";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    getChats: chatsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
