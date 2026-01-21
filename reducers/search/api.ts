import { axiosRequest, isLogined } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchHistory = createAsyncThunk("search/getSearchHistory", async () => {
    try {
        const { data } = await axiosRequest.get("/User/get-user-search-histories")
        return data.data
    } catch (error) {
        isLogined(error)
    }
})