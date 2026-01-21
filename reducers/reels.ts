import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosRequest } from '@/utils/axios'

export const getReels = createAsyncThunk('reels/getReels', async () => {
    try {
        const { data } = await axiosRequest.get('/Post/get-reels?PageNumber=1&PageSize=20')
        return data.data
    } catch (error) {
        console.error(error)
    }
})

export const getPostById = createAsyncThunk('reels/getPostById', async (id: number) => {
    try {
        const { data } = await axiosRequest.get(`/Post/get-post-by-id?id=${id}`)
        return data.data 
    } catch (error) {
        console.error(error)
    }
})

export const Postlike = createAsyncThunk('reels/Postlike', async (id: number, { dispatch }) => {
    try {
        await axiosRequest.post(`/Post/like-post?postId=${id}`)
        dispatch(getPostById(id)) 
    } catch (error) {
        console.error(error)
    }
})

export const Postkomment = createAsyncThunk('reels/Postkomment', async (obj: {id: number, komment: string}, { dispatch }) => {
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

const reelsSlice = createSlice({
    name: 'reels',
    initialState: {
        data: [] as any[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReels.fulfilled, (state, action) => {
                state.data = action.payload || []
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.data.findIndex((p: any) => p.postId === action.payload.postId)
                    if (index !== -1) {
                        state.data[index] = action.payload
                    }
                }
            })
    },
})

export default reelsSlice.reducer