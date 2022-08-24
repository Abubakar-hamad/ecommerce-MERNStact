import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



const product = JSON.parse(localStorage.getItem("products"))
const carts = JSON.parse(localStorage.getItem("cart"))

const initialState = {
    items : product ? product : null,
    product: '',
    cart:carts ? carts :'' ,
    isSuccess:false , 
    isLoading:false ,
    isError:false ,
    message:null
}


export const createProduct = createAsyncThunk('products/create' , async(data  , thunkAPI)=>{
    try {
        const res = await axios.post('prod/create' , data)
        return res.data
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const getProducts  =createAsyncThunk('products/getProducts'  , async( data  , thunkAPI)=>{
    try {
        const res = await axios.get(`prod/` , data)
        return res.data.products
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})



export const deleteProducts=  createAsyncThunk('products/deleteProd' , async(id ,  data , thunkAPI)=>{
    try {
        const res = await axios.delete(`prod/${id}` , data)
        return res.data
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})


export const getCart = createAsyncThunk('products/getCart' , async(data , thunkAPI)=>{
    try {   
        const res = await axios.get('/prod/cart' , data)
        return res.data
        
    } catch (error) {
        const message = (error.data && error.response && error.data.response ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }    
})



export const addToCart = createAsyncThunk('products/addcart' , async(id , data , thunkAPI)=>{
    try {
        const res = await axios.post(`/prod/cart/${id}` , data)
        return res.data
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
        state.product= ''
        state.isSuccess =false 
        state.isLoading =false 
        state.isError =false 
        state.message =''
    }
  } ,
  extraReducers:(builder)=>{
    builder
    // get all product
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


    // create Product
    .addCase(createProduct.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(createProduct.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.product = action.payload
    })
    .addCase(createProduct.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })


    // deletPro
    .addCase(deleteProducts.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(deleteProducts.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
 
    })
    .addCase(deleteProducts.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })

     // add to cart
     .addCase(addToCart.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(addToCart.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.product = action.payload
 
    })
    .addCase(addToCart.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })


     // get cart
     .addCase(getCart.pending , (state)=>{
        state.isLoading = true 
    })
    .addCase(getCart.fulfilled , (state , action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.cart = action.payload
 
    })
    .addCase(getCart.rejected  , (state , action)=>{
        state.isLoading = false 
        state.isError=true 
        state.message = action.payload
    })
  }
})


export const { reset } = ProductSlice.actions

export default ProductSlice.reducer