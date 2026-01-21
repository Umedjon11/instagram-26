import { axiosRequest } from "@/utils/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  _id?: string;
  thumbnailUrl?: string;
  image?: string;
  mediaUrl?: string;
  caption?: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const IMG_API = "https://instagram-api.softclub.tj/images/";

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get(
        "/Post/get-posts?PageNumber=1&PageSize=20"
      );

      return data.data.map((item: Post) => ({
        ...item,
        thumbnailUrl: item.thumbnailUrl
          ? IMG_API + item.thumbnailUrl
          : undefined,
        image: item.image ? IMG_API + item.image : undefined,
        mediaUrl: item.mediaUrl ? IMG_API + item.mediaUrl : undefined,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload; 
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;
