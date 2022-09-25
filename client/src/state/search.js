import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getSearch = createAsyncThunk('SEARCH', (input)=>{
    return axios
                .get(
                    `http://localhost:3001/api/search/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data)
})

const searchReducer = createReducer({}, {
    [getSearch.fulfilled]: (state, action)=> action.payload,
})

export default searchReducer