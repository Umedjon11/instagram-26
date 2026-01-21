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

export const clearHistory = createAsyncThunk("search/clearHistory", async (id: number, { dispatch }) => {
    try {
        await axiosRequest.delete("/User/delete-user-search-histories")
        dispatch(getSearchHistory())
    } catch (error) {
        console.error(id)
        isLogined(error)
    }
})

export const deleteFromHistory = createAsyncThunk("search/deleteFromHistory", async (id: number, { dispatch }) => {
    try {
        await axiosRequest.delete(`/User/delete-user-search-history?id=${id}`)
        dispatch(getSearchHistory())
    } catch (error) {
        isLogined(error)
    }
})

export const SearchProfiles = createAsyncThunk("search/searchProfiles", async (userName: string, { dispatch }) => {
    try {
        if (userName != "") {
            const { data } = await axiosRequest.get(`/User/get-users?UserName=${userName}`)
            return data.data
        }
        dispatch(getSearchHistory())
    } catch (error) {
        isLogined(error)
    }
})

export const AddToHistory = createAsyncThunk("search/AddToHistory", async (id: string, { dispatch }) => {
    try {
        await axiosRequest.post(`/User/add-user-search-history?UserSearchId=${id}`)
        dispatch(getSearchHistory())
    } catch (error) {
        isLogined(error)
    }
})