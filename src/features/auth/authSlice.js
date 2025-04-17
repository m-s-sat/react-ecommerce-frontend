import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUsers, updateUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null
};

export const createUserAsync = createAsyncThunk(
  'users/createUsers',
  async (userData) => {
    const response = await createUsers(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'users/checkUser',
  async(loginInfo)=>{
    const response = await checkUser(loginInfo);
    return response.data;
  }
)

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async(update)=>{
    const response = await updateUser(update);
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending,(state,action)=>{
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled,(state,action)=>{
        state.loggedInUser = action.payload;
        state.status = 'idle';
      })
      .addCase(checkUserAsync.rejected,(state,action)=>{
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending,(state,action)=>{
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;
export default userSlice.reducer;
