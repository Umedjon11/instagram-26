import  homeSlice  from '@/reducers/home';
import postsReducer from '@/reducers/interesting';
import reelsReducer from '@/reducers/reels';
import { chatsSlice } from "@/reducers/mesage";
import counterSlice from "@/reducers/profile";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from '@/reducers/search/search';

export const store = configureStore({
  reducer: {
    getChats: chatsSlice.reducer,
    counter: counterSlice,
    reels: reelsReducer,
    search: searchSlice,
    home: homeSlice,
    posts: postsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
