<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/reducers/interesting";

export const store = configureStore({
  reducer: {
    posts: postsReducer, 
  },
});
=======
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
    search: searchSlice
  },
})
>>>>>>> b2f7d7926d14085a482adcd295a217dbb8682f66

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
