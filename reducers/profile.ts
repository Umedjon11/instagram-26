import { createSlice } from "@reduxjs/toolkit";
import { GetPosts, GetProfile } from "./apiProfile";

export interface CounterState {
  data: {
    userName: string;
    image: string;
    dateUpdated: string;
    gender: "Male" | "Female" | string;
    postCount: number;
    subscribersCount: number;
    subscriptionsCount: number;
    firstName: string;
    lastName: string;
    locationId: number;
    dob: string;
    occupation: string;
    about: string;
  };
  isLoading?: boolean;
  posts: [];
}

const initialState: CounterState = {
  data: {
    userName: "",
    image: "",
    dateUpdated: "",
    gender: "",
    postCount: 0,
    subscribersCount: 0,
    subscriptionsCount: 0,
    firstName: "",
    lastName: "",
    locationId: 0,
    dob: "",
    occupation: "",
    about: "",
  },
  isLoading: false,
  posts: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(GetProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(GetPosts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default counterSlice.reducer;
