import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  familyName: "",
  CNP: "",
  dateOfBirth: "",
  gender: "",
  role: "patient",
  CUIM: "",
  county: "",
  town: "",
  profilePic: "",
  isActive: false,
};
export const signupPatientSlice = createSlice({
  name: "signupPatient",
  initialState,
  reducers: {
    setEmailPatient: (state, action) => {
      state.email = action.payload;
    },
    setPasswordPatient: (state, action) => {
      state.password = action.payload;
    },

    setFirstNamePatient: (state, action) => {
      state.firstName = action.payload;
    },
    setFamilyNamePatient: (state, action) => {
      state.familyName = action.payload;
    },
    setCNPPatient: (state, action) => {
      state.CNP = action.payload;
    },
    setDateOfBirthPatient: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setGenderPatient: (state, action) => {
      state.gender = action.payload;
    },
    setCUIMPatient: (state, action) => {
      state.CUIM = action.payload;
    },
    setTownPatient: (state, action) => {
      state.town = action.payload;
    },
    setCountyPatient: (state, action) => {
      state.county = action.payload;
    },
    setProfilePicPatient: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const {
  setCUIMPatient,
  setEmailPatient,
  setPasswordPatient,
  setGenderPatient,
  setCNPPatient,
  setDateOfBirthPatient,
  setFirstNamePatient,
  setFamilyNamePatient,
  setTownPatient,
  setCountyPatient,
  setProfilePicPatient,
} = signupPatientSlice.actions;
export default signupPatientSlice.reducer;
