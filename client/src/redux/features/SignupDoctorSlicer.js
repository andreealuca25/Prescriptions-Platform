import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  familyName: "",
  CNP: "",
  dateOfBirth: "",
  gender: "",
  CUIM: "",
  role: "doctor",
  sanitaryUnit: "",
  town: "",
  county: "",
  profilePic: "",
  isActive: false,
};
export const signupDoctorSlice = createSlice({
  name: "signupDoctor",
  initialState,
  reducers: {
    setEmailDoctor: (state, action) => {
      state.email = action.payload;
    },
    setPasswordDoctor: (state, action) => {
      state.password = action.payload;
    },

    setFirstNameDoctor: (state, action) => {
      state.firstName = action.payload;
    },
    setFamilyNameDoctor: (state, action) => {
      state.familyName = action.payload;
    },
    setCNPDoctor: (state, action) => {
      state.CNP = action.payload;
    },
    setDateOfBirthDoctor: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setGenderDoctor: (state, action) => {
      state.gender = action.payload;
    },
    setCUIMDoctor: (state, action) => {
      state.CUIM = action.payload;
    },
    setTownDoctor: (state, action) => {
      state.town = action.payload;
    },
    setCountyDoctor: (state, action) => {
      state.county = action.payload;
    },
    setSanitaryUnit: (state, action) => {
      state.sanitaryUnit = action.payload;
    },
    setProfilePicDoctor: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const {
  setCUIMDoctor,
  setEmailDoctor,
  setPasswordDoctor,
  setGenderDoctor,
  setCNPDoctor,
  setDateOfBirthDoctor,
  setFirstNameDoctor,
  setFamilyNameDoctor,
  setTownDoctor,
  setCountyDoctor,
  setSanitaryUnit,
  setProfilePicDoctor,
} = signupDoctorSlice.actions;
export default signupDoctorSlice.reducer;
