import {createSlice} from '@reduxjs/toolkit';

interface UserStateType {
  user: any;
  isLoading: boolean;
  isRejected: boolean;
  error: string;
}

const initialState: UserStateType = {
  user: null,
  isLoading: true,
  isRejected: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {
    userDetailsLoading: (state, action) => {
      state.isLoading = action.payload;
      state.isRejected = false;
    },
    getUserDetails: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isRejected = false;
    },
    userDetailsRejected: (state, action) => {
      state.isLoading = false;
      state.isRejected = true;
      state.error = action.payload;
    },
  },
});

export const {userDetailsLoading, getUserDetails, userDetailsRejected} =
  userSlice.actions;

export default userSlice.reducer;
