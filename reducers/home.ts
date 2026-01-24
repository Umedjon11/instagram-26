import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "@/utils/axios";

interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
}

interface HomeState {
  data: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: [],
  loading: false,
  error: null,
};

export const getPosts = createAsyncThunk<Post[]>(
  "home/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.get("/Post/get-posts");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка загрузки постов");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
