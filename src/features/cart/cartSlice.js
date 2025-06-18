import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemsFromcart, fetchItemsByUserId, resetCart, updateCart } from '../cart/cartAPI';

const initialState = {
  items:[],
  status: 'idle',
  cartChecked : false,
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async()=>{
    const response = await fetchItemsByUserId();
    return response.data;
  }
)

export const updateCartAsync = createAsyncThunk(
  'cart/updateItem',
  async(update)=>{
    const response = await updateCart(update);
    return response.data;
  }
)
export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async(item)=>{
    const response = await deleteItemsFromcart(item);
    return response.data;
  }
)

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async()=>{
    const response = await resetCart();
    return response.data;
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.items = action.payload;
        state.cartChecked = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected,(state,action)=>{
        state.status = 'reject';
        state.cartChecked = true;
      })
      .addCase(fetchItemByUserIdAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(updateCartAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending,(state,action)=>{
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled,(state,action)=>{
        state.action = 'idle';
        state.items = [];
      });
  },
});

export const selectCart = (state) => state.cart.items;
export const selectCartChecked = (state)=>state.cart.cartChecked;
export default cartSlice.reducer;
