import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setPatient: (state) => {
      state.value = "patient";
    },
    setDoctor: (state) => {
      state.value = "doctor";
    },
    removeRole: (state) => {
      state.value = "";
    },
    setRole: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPatient, setDoctor, removeRole, setRole } = roleSlice.actions;
export default roleSlice.reducer;
