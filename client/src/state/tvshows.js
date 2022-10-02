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

export const getAiringTodayShows = createAsyncThunk('AIRINGSHOWS', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/tvshows/getAiringToday',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getTopRatedShows = createAsyncThunk('TOPRATEDSHOWS', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/tvshows/getTopRated',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOnTVShows = createAsyncThunk('ONTVSHOWS', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/tvshows/getOnTV',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOneTvshow = createAsyncThunk('ONETVSHOW', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/tvshows/getOneTvshow/${input}`,
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
    [getAiringTodayShows.fulfilled]: (state, action)=> action.payload,
    [getOnTVShows.fulfilled]: (state, action)=> action.payload,
    [getTopRatedShows.fulfilled]: (state, action)=> action.payload,
    [getOneTvshow.fulfilled]: (state, action)=> action.payload,
    [searchByShow.fulfilled]: (state, action)=> action.payload,
})

export default showsReducer