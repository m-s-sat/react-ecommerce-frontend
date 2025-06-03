import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllBrands, fetchAllCategories, fetchAllProduct, fetchProductByFilters, fetchProductById, updateProduct } from './productAPI';

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

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async(product)=>{
    const response = await createProduct(product);
    return response.data
  }
)

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async(product)=>{
    const response = await updateProduct(product);
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state)=>{
      state.selectedProduct = null;
    }
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
      })
      .addCase(createProductAsync.fulfilled,(state,action)=>{
        state.products.push(action.payload);
        state.status = 'idle';
      })
      .addCase(createProductAsync.pending,(state)=>{
        state.status = 'pending';
      })
      .addCase(updateProductAsync.pending,(state)=>{
        state.status = ' loading';
      })
      .addCase(updateProductAsync.fulfilled,(state,action)=>{
        const index = state.products.findIndex((product)=>product.id===action.payload.id);
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state)=>state.product.totalItems;
export const selectBrands = (state)=>state.product.brands;
export const selectCategories = (state)=>state.product.categories;
export const selectProductById = (state)=>state.product.selectedProduct;
export default productSlice.reducer;
