import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularPeople = createAsyncThunk('POPULARPEOPLE', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/people/getPopular/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const searchByPerson = createAsyncThunk('SEARCHBYPERSON', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/search/people/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

const peopleReducer = createReducer({}, {
    [getPopularPeople.fulfilled]: (state, action)=> action.payload,
    [searchByPerson.fulfilled]: (state, action)=> action.payload,
})

export default peopleReducer