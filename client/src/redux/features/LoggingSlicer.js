import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: false,
  rememberMe: false,
};

export const loggingSlice = createSlice({
  name: "logging",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    setLogging: (state, action) => {
      state.value = JSON.parse(action.payload);
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
  },
});

export const { toggle, setLogging, toggleRememberMe } = loggingSlice.actions;
export default loggingSlice.reducer;
