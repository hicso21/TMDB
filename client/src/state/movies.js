import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularMovies = createAsyncThunk('POPULARMOVIES', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/movies/getPopular',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getNowPlayingMovies = createAsyncThunk('NOWPLAYINGMOVIES', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/movies/getNowPlaying',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getTopRatedMovies = createAsyncThunk('TOPRATEDMOVIES', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/movies/getTopRated',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getUpcomingMovies = createAsyncThunk('TOPRATEDMOVIES', ()=>{
    return axios
                .get(
                    'http://localhost:3001/api/movies/getUpcoming',
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOneMovie = createAsyncThunk('ONEMOVIE', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/movies/getOneMovie/${input}`,
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
                .then(res=>res.data.results)
})

export const getMovieGenders = createAsyncThunk('SEARCHBYMOVIE', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/search/movie/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

const moviesReducer = createReducer({}, {
    [getPopularMovies.fulfilled]: (state, action)=> action.payload,
    [getTopRatedMovies.fulfilled]: (state, action)=> action.payload,
    [getUpcomingMovies.fulfilled]: (state, action)=> action.payload,
    [getNowPlayingMovies.fulfilled]: (state, action)=> action.payload,
    [getOneMovie.fulfilled]: (state, action)=> action.payload,
    [searchByMovie.fulfilled]: (state, action)=> action.payload,
    [getMovieGenders.fulfilled]: (state, action)=> action.payload,
})

export default moviesReducer