import { createSlice } from "@reduxjs/toolkit";

const userSlice  = createSlice({
  name: "User",
  initialState: {
    email: '',
    role: '',
  },
  reducers: {
    setUser: (state, action) => {
    const { email, role } = action.payload;
      state.email = email;
      state.role = role;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;