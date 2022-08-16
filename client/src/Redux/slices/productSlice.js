import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



const product = JSON.parse(localStorage.getItem("products"))

const initialState = {
    items : product ? product : null,
    isSuccess:false , 
    isLoading:false ,
    isError:false ,
    message:null
}


export const getProducts  =createAsyncThunk('products/getProducts'  , async(data  , thunkAPI)=>{
    try {
        const res = await axios.get('prod/' , data)
        return res.data.products
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset:(state)=>{
        state.items  = ''
        state.isSuccess =false 
        state.isLoading =false 
        state.isError =false 
        state.message =''
    }
  } ,
  extraReducers:(builder)=>{
    builder
    .addCase(getProducts.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(getProducts.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.items = action.payload
    })
    .addCase(getProducts.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })
  }
})


export const { reset } = ProductSlice.actions

export default ProductSlice.reducer