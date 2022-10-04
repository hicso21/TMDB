import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const getPopularPeople = createAsyncThunk('POPULARPEOPLE', (input)=>{
    return fetchAPI(
                    `/api/people/getPopular/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

export const searchByPerson = createAsyncThunk('SEARCHBYPERSON', (input)=>{
    return fetchAPI(
                    `/api/people/search/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

const peopleReducer = createReducer({}, {
    [getPopularPeople.fulfilled]: (state, action)=> action.payload,
    [searchByPerson.fulfilled]: (state, action)=> action.payload,
})

export default peopleReducer