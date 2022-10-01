import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularShows = createAsyncThunk('POPULARSHOWS', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/tvshows/getPopular',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getLatestShows = createAsyncThunk('LATESTSHOWS', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/tvshows/getLatest',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOneTvshow = createAsyncThunk('ONETVSHOW', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/movies/getOneTvshow/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

export const searchByShow = createAsyncThunk('SEARCHBYSHOW', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/search/tvshow/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

const showsReducer = createReducer({}, {
    [getPopularShows.fulfilled]: (state, action)=> action.payload,
    [getLatestShows.fulfilled]: (state, action)=> action.payload,
    [getOneTvshow.fulfilled]: (state, action)=> action.payload,
    [searchByShow.fulfilled]: (state, action)=> action.payload,
})

export default showsReducer