import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSearchHistory, SearchProfiles } from './api'

export interface SearchState {
    searchHistory: IHistory[]
    isLoading: boolean
}

export interface IHistory {
    id: number,
    users: {
        id: string,
        avatar: string,
        fullName: string,
        subscribersCount: number,
        userName: string
    }
}

const initialState: SearchState = {
    searchHistory: [],
    isLoading: true
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(getSearchHistory.pending, (state) => {
            state.isLoading = true
            state.searchHistory = []
        })
        build.addCase(getSearchHistory.fulfilled, (state, { payload }) => {
            state.searchHistory = payload
            state.isLoading = false
        })
        build.addCase(getSearchHistory.rejected, (state) => {
            state.isLoading = false
            state.searchHistory = []
        })
        build.addCase(SearchProfiles.pending, (state) => {
            state.isLoading = true
            state.searchHistory = []
        })
        build.addCase(SearchProfiles.fulfilled, (state, { payload }) => {
            state.searchHistory = payload
            state.isLoading = false
        })
        build.addCase(SearchProfiles.rejected, (state) => {
            state.isLoading = false
            state.searchHistory = []
        })
    }
})

// Action creators are generated for each case reducer function
export const { } = searchSlice.actions

export default searchSlice.reducer