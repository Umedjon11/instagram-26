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

export const getPostById = createAsyncThunk('home/getPostById', async (id: number) => {
  try {
      const { data } = await axiosRequest.get(`/Post/get-post-by-id?id=${id}`)
      return data.data 
  } catch (error) {
      console.error(error)
  }
})

export const getStories = createAsyncThunk('home/getStories', async (id: number) => {
  try {
      const { data } = await axiosRequest.get(`/Story/get-stories`)
      return data.data 
  } catch (error) {
      console.error(error)
  }
})

export const getStoriesById = createAsyncThunk('home/getStoriesById', async (id: number) => {
  try {
      const { data } = await axiosRequest.get(`/Story/get-user-stories/${id}`)
      return data.data 
  } catch (error) {
      console.error(error)
  }
})

export const Postlike = createAsyncThunk('home/Postlike', async (id: number, { dispatch }) => {
  try {
      await axiosRequest.post(`/Post/like-post?postId=${id}`)
      dispatch(getPostById(id)) 
  } catch (error) {
      console.error(error)
  }
})

export const Postkomment = createAsyncThunk('home/Postkomment', async (obj: {id: number, komment: string}, { dispatch }) => {
  try {
      const response = await axiosRequest.post(`/Post/add-comment`, {
          comment: obj.komment, 
          postId: obj.id
      })
      if(response.data) {
          await dispatch(getPostById(obj.id))
      }
      return response.data
  } catch (error) {
      console.error(error)
      throw error
  }
})

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

      .addCase(getPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getPostById.fulfilled, (state, action) => {
        if (action.payload) {
            const index = state.data.findIndex((p: any) => p.postId === action.payload.postId)
            if (index !== -1) {
                state.data[index] = action.payload
            }
        }
      })

      .addCase(getStories.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(getStoriesById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
  },
});

export default homeSlice.reducer;
