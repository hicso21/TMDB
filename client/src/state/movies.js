import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const getPopularMovies = createAsyncThunk('POPULARMOVIES', ()=>{
    return fetchAPI(
                    {method:'GET', url:'/api/movies/getPopular'}
                )
                .then(res=>res.data.results)
})

export const getNowPlayingMovies = createAsyncThunk('NOWPLAYINGMOVIES', ()=>{
    return fetchAPI(
                    {method:'GET', url:'/api/movies/getNowPlaying'},
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getTopRatedMovies = createAsyncThunk('TOPRATEDMOVIES', ()=>{
    return fetchAPI(
                    {method:'GET', url:'/api/movies/getTopRated'},
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getUpcomingMovies = createAsyncThunk('TOPRATEDMOVIES', ()=>{
    return fetchAPI(
                    {method:'GET', url:'/api/movies/getUpcoming'},
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getOneMovie = createAsyncThunk('ONEMOVIE', (input)=>{
    return fetchAPI(
                    {method:'GET', url:`/api/movies/getOneMovie/${input}`},
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

export const searchByMovie = createAsyncThunk('SEARCHBYMOVIE', (input)=>{
    return fetchAPI(
                    {method:'GET', url:`/api/search/movie/${input}`},
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const getMovieGenders = createAsyncThunk('SEARCHBYMOVIE', (input)=>{
    return fetchAPI(
                    {method:'GET', url:`/api/search/movie/${input}`},
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