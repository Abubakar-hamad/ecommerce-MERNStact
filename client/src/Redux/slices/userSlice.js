import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const profile = JSON.parse(localStorage.getItem("u-p"))


const initialState = {
    user : profile ? profile : null,
    isSuccess:false , 
    isLoading:false ,
    isError:false ,
    message:null
}


export const registerUser=createAsyncThunk('user/register'  , async(data  , thunkAPI)=>{
    try {
        const res = await axios.post('auth/register' , data)
        
        return res.data
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


export const loginUser  = createAsyncThunk('user/login' ,  async(data  , thunkAPI)=>{
    try {
        const res = await axios.post('auth/login' , data)
        localStorage.setItem('u-p' , JSON.stringify(res.data.name))
        return res.data
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const UserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset:(state)=>{
        state.user  = ''
        state.isSuccess =false 
        state.isLoading =false 
        state.isError =false 
        state.message =''
    }
  } ,
  extraReducers:(builder)=>{
    builder
    .addCase(registerUser.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(registerUser.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.user = action.payload
    })
    .addCase(registerUser.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })

    // login

    .addCase(loginUser.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(loginUser.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.user = action.payload
    })
    .addCase(loginUser.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })
  }
})


export const { reset } = UserSlice.actions

export default UserSlice.reducer