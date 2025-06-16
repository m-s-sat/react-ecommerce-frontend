import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';
const initialState = {
  status: 'idle',
  userInfo: null,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedinUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async()=>{
    const response = await fetchLoggedInUser();
    return response.data;
  }
)

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async(id)=>{
    const response = await updateUser(id);
    return response.data;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending,(state,action)=>{
        state.status = 'pending';
      })
      .addCase(updateUserAsync.fulfilled,(state,action)=>{
        state.userInfo = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchLoggedinUserAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedinUserAsync.pending,(state,action)=>{
        state.status = 'pending';
      });
  },
});

export const selectLoggedInUserOrder = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state)=>state.user.userInfo;

export default userSlice.reducer;
