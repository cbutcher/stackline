import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getProductById from '../api/getProductById'
import { ProductModel } from '../api/productModels';

interface ProductState {
  error?: Error;
  product?: ProductModel;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  status: 'idle'
}

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId: string) => {
  return await getProductById({ productId });
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductById.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error);
      })
  }
})