import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchAllProduct, fetchProductByFilters, fetchProductById } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  selectedProduct:null,
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

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async(id)=>{
    const response = await fetchProductById(id);
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
        state.status = 'pending';
      })
      .addCase(fetchAllCategoryAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending,(state,action)=>{
        state.status = 'pending'
      });
  },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state)=>state.product.totalItems;
export const selectBrands = (state)=>state.product.brands;
export const selectCategories = (state)=>state.product.categories;
export const selectProductById = (state)=>state.product.selectedProduct;
export default productSlice.reducer;
