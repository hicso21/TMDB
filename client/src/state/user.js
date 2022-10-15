import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import fetchAPI from "../utils/fetchAPI";

export const signupRequest = createAsyncThunk('SIGNUP', (input)=>{
    return fetchAPI({method:'POST', url:'/api/user/signup', data:input})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
})

export const loginRequest = createAsyncThunk('LOGIN', (input)=>{
    return fetchAPI({method:'POST', url:'/api/user/login', data:input, withCredentials:true})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
})

export const logoutRequest = createAsyncThunk('LOGOUT', ()=>{
    return fetchAPI({method:'POST', url:'/api/user/logout'})
            .then((r)=> r.data)
            .catch((err)=> console.log(err))
})

export const getMe = createAsyncThunk("ME", () => {
    return fetchAPI({method:'GET', url:'api/user/me', withCredentials:true})
            .then((r)=>r.data)
});

export const setUser = createAction("SETUSER", (input) => {
    return input
})


const userReducer = createReducer({}, {
    [loginRequest.fulfilled]: (state, action)=> action.payload,
    [logoutRequest.fulfilled]: (state, action)=> action.payload,
    [signupRequest.fulfilled]: (state, action)=> action.payload,
    [getMe.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload
})

export default userReducer