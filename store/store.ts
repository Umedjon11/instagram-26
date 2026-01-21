import reelsReducer from '@/reducers/reels';
import { chatsSlice } from "@/reducers/mesage";
import counterSlice from "@/reducers/profile";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    getChats: chatsSlice.reducer,
    counter: counterSlice,
    reels: reelsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
