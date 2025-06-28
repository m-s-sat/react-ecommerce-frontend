import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUsers, signOut, checkAuth, resetPasswordRequest } from './authAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error:null,
  userChecked: false,
  mailSent: false,
  passwordResetStatus: false,
};

export const createUserAsync = createAsyncThunk(
  'users/createUsers',
  async (userData) => {
    const response = await createUsers(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  'users/loginUser',
  async(loginInfo,{rejectWithValue})=>{
    try{
      const response = await loginUser(loginInfo);
      return response.data;
    }
    catch(err){
      return rejectWithValue(err);
    }
  }
)

export const checkAuthAsync = createAsyncThunk(
  'user/checkUser',
  async()=>{
    try{
      const response = await checkAuth();
      return response.data;
    }
    catch(err){
      console.log(err);
    }
  }
)

export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async(email)=>{
    try{
      const response = await resetPasswordRequest(email);
      return response.data;
    }
    catch(err){
      console.log(err);
    }
  }
)

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async(email)=>{
    try{
      const response = await resetPasswordRequest(email);
      return response.data;
    }
    catch(err){
      console.log(err);
    }
  }
)

export const userSignOutAsync = createAsyncThunk(
  'user/signOut',
  async(id)=>{
    const response = await signOut(id);
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending,(state,action)=>{
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled,(state,action)=>{
        state.loggedInUserToken = action.payload;
        state.status = 'idle';
      })
      .addCase(loginUserAsync.rejected,(state,action)=>{
        state.error = action.error;
      })
      .addCase(userSignOutAsync.pending,(state,action)=>{
        state.status = 'pending';
      })
      .addCase(userSignOutAsync.fulfilled,(state,action)=>{
        state.loggedInUserToken = null;
        state.status = 'idle';
      })
      .addCase(checkAuthAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected,(state,action)=>{
        state.status = 'reject';
        state.userChecked = false;
      })
      .addCase(resetPasswordRequestAsync.pending,(state)=>{
        state.status = 'pending';
      })
      .addCase(resetPasswordRequestAsync.fulfilled,(state,action)=>{
        state.mailSent = true;
        state.status = 'idle'
      })
      .addCase(resetPasswordAsync.pending,(state)=>{
        state.status = 'pending';
      })
      .addCase(resetPasswordAsync.fulfilled,(state,action)=>{
        state.passwordResetStatus = true;
        state.status = 'idle';
      });
  },
});

export const selectPasswordResetStatus = (state) => state.auth.passwordResetStatus;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state)=>state.auth.error;
export const selectUserChecked = (state)=>state.auth.userChecked;
export default userSlice.reducer;
