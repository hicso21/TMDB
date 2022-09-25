import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularMovies = createAsyncThunk('POPULAR', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/movies/getPopular',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

export const getLatestMovies = createAsyncThunk('LATEST', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/movies/getLatest',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

export const searchByMovie = createAsyncThunk('SEARCHBYMOVIE', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/search/movie/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

const moviesReducer = createReducer({}, {
    [getPopularMovies.fulfilled]: (state, action)=> action.payload,
    [getLatestMovies.fulfilled]: (state, action)=> action.payload,
    [searchByMovie.fulfilled]: (state, action)=> action.payload,
})

export default moviesReducer