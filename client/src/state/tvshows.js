import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const getPopularShows = createAsyncThunk('POPULARSHOWS', ()=>{
    return fetchAPI(
                    '/api/tvshows/getPopular',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getAiringTodayShows = createAsyncThunk('AIRINGSHOWS', ()=>{
    return fetchAPI(
                    '/api/tvshows/getAiringToday',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getTopRatedShows = createAsyncThunk('TOPRATEDSHOWS', ()=>{
    return fetchAPI(
                    '/api/tvshows/getTopRated',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOnTVShows = createAsyncThunk('ONTVSHOWS', ()=>{
    return fetchAPI(
                    '/api/tvshows/getOnTV',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOneTvshow = createAsyncThunk('ONETVSHOW', (input)=>{
    return fetchAPI(
                    `/api/tvshows/getOneTvshow/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

export const searchByShow = createAsyncThunk('SEARCHBYSHOW', (input)=>{
    return fetchAPI(
                    `/api/search/tvshow/${input}`,
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