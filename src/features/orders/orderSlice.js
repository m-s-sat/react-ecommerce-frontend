import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, orderUpdate } from './orderAPI';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrder: null,
  totalOrders : 0,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'orders/fetchAllOrders',
  async(pagination)=>{
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
)

export const orderUpdateAsync = createAsyncThunk(
  'orders/updateOrders',
  async(order)=>{
    const response = await orderUpdate(order);
    return response.data;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder : (state)=>{
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending,(state)=>{
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(orderUpdateAsync.pending,(state)=>{
        state.status = "pending";
      })
      .addCase(orderUpdateAsync.fulfilled,(state,action)=>{
        state.status = "idle";
        const index = state.orders.findIndex((order)=>order.id===action.payload.id);
        state.orders[index] = action.payload;
      });
  },
});
export const {resetOrder} = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state)=>state.order.orders
export const selectTotalOrders = (state)=>state.order.totalOrders
export default orderSlice.reducer;
