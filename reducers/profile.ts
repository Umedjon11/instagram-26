import { createSlice } from "@reduxjs/toolkit";
import {
  FollowUser,
  GetById,
  GetFolowers,
  GetFolowings,
  GetInfoById,
  GetPosts,
  GetPostsFavorite,
  GetProfile,
  UnFollow,
  UpdateUserProfile,
} from "./apiProfile";

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
  folowers: [];
  followersLoaded: boolean;
  folowings: [];
  followingsLoaded: boolean;
  dataById: {
    userName: string;
    image: string;
    gender: string;
    firstName: string;
    lastName: string;
    about: string;
  } | null;
  mySubscriptions: { id: string | number }[];
  followLoading: boolean;
  postsFavorite: [];
  favoriteLoaded: boolean;
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
  folowers: [],
  followersLoaded: false,
  folowings: [],
  followingsLoaded: false,
  dataById: null,
  mySubscriptions: [],
  followLoading: false,
  postsFavorite: [],
  favoriteLoaded: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    clearFollowers(state) {
      state.folowers = [];
      state.followersLoaded = false;
    },
    clearFollowings(state) {
      state.folowings = [];
      state.followingsLoaded = false;
    },
  },
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
    builder.addCase(GetFolowers.pending, (state) => {
      state.followersLoaded = true;
    });

    builder.addCase(GetFolowers.fulfilled, (state, action) => {
      state.folowers = action.payload;
      state.followersLoaded = true;
    });

    builder.addCase(GetFolowers.rejected, (state) => {
      state.followersLoaded = false;
    });
    builder.addCase(GetFolowings.pending, (state) => {
      state.followingsLoaded = true;
    });
    builder.addCase(GetFolowings.fulfilled, (state, action) => {
      state.folowings = action.payload;
      state.followingsLoaded = true;
    });
    builder.addCase(GetFolowings.rejected, (state) => {
      state.followingsLoaded = false;
    });
    builder.addCase(GetById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(GetById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataById = action.payload;
    });

    builder.addCase(GetById.rejected, (state) => {
      state.isLoading = false;
    });
    builder
      .addCase(UpdateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateUserProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetInfoById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetInfoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataById = action.payload;
      })
      .addCase(GetInfoById.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(FollowUser.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(FollowUser.fulfilled, (state) => {
        state.followLoading = false;
      })
      .addCase(UnFollow.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(UnFollow.fulfilled, (state) => {
        state.followLoading = false;
      });
    builder.addCase(GetPostsFavorite.pending, (state) => {
      state.favoriteLoaded = false;
    });

    builder.addCase(GetPostsFavorite.fulfilled, (state, action) => {
      state.postsFavorite = action.payload;
      state.favoriteLoaded = true;
    });

    builder.addCase(GetPostsFavorite.rejected, (state) => {
      state.favoriteLoaded = false;
    });
  },
});

export const { clearFollowers, clearFollowings } = counterSlice.actions;
export default counterSlice.reducer;
