import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const signupRequest = createAsyncThunk('SIGNUP', (input)=>{
    return fetchAPI({method:'POST', url:'/api/user/signup', data:input})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
})

export const loginRequest = createAsyncThunk('LOGIN', (input)=>{
    return fetchAPI({method:'POST', url:'/api/user/login', data:input})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
})

export const logoutRequest = createAsyncThunk('LOGOUT', (input)=>{
    return fetchAPI({method:'POST', url:'/api/user/logout'})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
})

export const setUser = createAsyncThunk("SETUSER", () => {
    return fetchAPI({method:'GET', url:'api/user/me'})
            .then((r)=>r.data)
});

const userReducer = createReducer({}, {
    [loginRequest.fulfilled]: (state, action)=> action.payload,
    [logoutRequest.fulfilled]: (state, action)=> action.payload,
    [signupRequest.fulfilled]: (state, action)=> action.payload,
    [setUser.fulfilled]: (state, action) => action.payload
})

export default userReducer