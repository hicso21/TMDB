import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const loginRequest = createAsyncThunk('LOGIN', ()=>{
    
})

const userReducer = createReducer({}, {
    [loginRequest.fulfilled]: (state, action)=> action.payload,
})

export default userReducer