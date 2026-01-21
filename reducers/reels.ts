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
const reelsSlice = createSlice({
    name: 'reels',
    initialState: {
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReels.fulfilled, (state, action) => {
                state.data = action.payload
            })
    },
})

export default reelsSlice.reducer