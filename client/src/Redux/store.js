import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import reviewReducer from './slices/reviewSlice'
export const store = configureStore({
  reducer: {
    products:productReducer,
    auth:userReducer,
    review:reviewReducer ,

  },
})

