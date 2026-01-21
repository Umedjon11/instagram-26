import { axiosRequest } from "@/utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getPosts = createAsyncThunk("todos/getTodo", async () => {
    try {
        const { data } = await axiosRequest.get("/Post/get-posts");
        return data.data;
    } catch (error) {
        console.error(error)
    }
})