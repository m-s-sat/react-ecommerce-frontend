import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchAllProduct, fetchProductByFilters } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  status: 'idle',
};

export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProduct',
  async () => {
    const response = await fetchAllProduct();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByFiltersAsync = createAsyncThunk(
  'product/fetchProductsFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductByFilters(filter,sort,pagination);
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async ()=>{
    const response = await fetchAllBrands();
    return response.data;
  }
)


export const fetchAllCategoryAsync = createAsyncThunk(
  'product/fetchAllCategory',
  async()=>{
    const response = await fetchAllCategories();
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFiltersAsync.pending,(state,action)=>{
        state.status = 'pending';
      })
      .addCase(fetchProductByFiltersAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending,(state)=>{
        state.status = 'idle';
      })
      .addCase(fetchAllBrandsAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoryAsync.pending,(state)=>{
        state.status = 'idle';
      })
      .addCase(fetchAllCategoryAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.categories = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state)=>state.product.totalItems;
export const selectBrands = (state)=>state.product.brands;
export const selectCategories = (state)=>state.product.categories;
export default productSlice.reducer;
