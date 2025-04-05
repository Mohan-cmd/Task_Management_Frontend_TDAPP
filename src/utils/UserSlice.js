import { createSlice } from "@reduxjs/toolkit";
import { AdminAccount } from "./constants";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userAccount: '',
    isAdmin: false,
    isManager: false,
    managers: [],
  },
  reducers: {
    addManagers: (state, action) => {
      state.managers = action.payload;
    },
    addUser: (state, action) => {
      const userAddress = action.payload.toLowerCase();
      state.userAccount = userAddress;
      
      state.isAdmin = userAddress === AdminAccount.toLowerCase();
      state.isManager = state.managers.some(
        (manager) => manager.toLowerCase() === userAddress
      );
    },
  },
});

export const { addUser, addManagers } = userSlice.actions;
export default userSlice.reducer;
