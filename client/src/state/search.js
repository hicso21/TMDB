import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const getSearch = createAsyncThunk('SEARCH', (input)=>{
    return fetchAPI(
                    `/api/search/${input}`,
                    { withCredentials: true, credentials: 'include' }
                )
                .then(res=>res.data.results)
})

const searchReducer = createReducer({}, {
    [getSearch.fulfilled]: (state, action)=> action.payload,
})

export default searchReducer