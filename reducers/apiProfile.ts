import { axiosRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetProfile = createAsyncThunk("profile/GetProfile", async () => {
  try {
    const { data } = await axiosRequest.get("/UserProfile/get-my-profile");
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const GetPosts = createAsyncThunk(
  "profile/GetPosts",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(
        `/Post/get-posts?UserId=${userId}`,
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const GetFolowers = createAsyncThunk(
  "profile/GetFolowers",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscribers?UserId=${userId}`,
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const GetFolowings = createAsyncThunk(
  "profile/GetFolowings",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscriptions?UserId=${userId}`,
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const GetById = createAsyncThunk(
  "profile/GetById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(
        `/UserProfile/get-user-profile-by-id?id=${userId}`,
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);