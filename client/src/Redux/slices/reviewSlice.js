import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'





const initialState = {
    comments : [],
    isSuccess:false , 
    isLoading:false ,
    isError:false ,
    message:null
}


export const getComments = createAsyncThunk('getcomments' , async( id , data  , thunkAPI)=>{
    try {
        const res = await axios.get(`/comment/${id}` , data)
        return res.data
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


    
  


export const ReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    reset:()=> initialState

  },

  extraReducers:(builder)=>{
    builder
    // get all product
   
    .addCase(getComments.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(getComments.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.comments = action.payload
    })
    .addCase(getComments.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })

    // add comment
   
  }
})


export const { reset  } = ReviewSlice.actions

export default ReviewSlice.reducer