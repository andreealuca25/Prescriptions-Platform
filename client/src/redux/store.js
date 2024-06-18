import { configureStore } from "@reduxjs/toolkit";
import loggingReducer from "./features/LoggingSlicer";
import roleReducer from "./features/RoleSlicer";
import signupDoctorReducer from "./features/SignupDoctorSlicer";
import signupPatientReducer from "./features/SignupPatientSlicer";

export const store = configureStore({
  reducer: {
    logging: loggingReducer,
    role: roleReducer,
    signupDoctor: signupDoctorReducer,
    signupPatient: signupPatientReducer,
  },
});
