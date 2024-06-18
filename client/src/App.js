import React, { useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ConfirmationEmail from "./components/ConfirmationEmail/ConfirmationEmail";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import PatientOrDoctor from "./components/PatientOrDoctor/PatientOrDoctor";
import SignupPatient from "./components/Signup/SignupPatient";
import SignupDoctor from "./components/Signup/SignupDoctor";
import MenuDoctor from "./components/Menu/MenuDoctor";
import MenuPatient from "./components/Menu/MenuPatient";
import CreateDoctorSideMenu from "./components/CreateDoctor/CreateDoctorSideMenu";
import PatientsSideMenu from "./components/Patients/PatientsSideMenu";
import { setRole } from "./redux/features/RoleSlicer";
import { setLogging } from "./redux/features/LoggingSlicer";
import PersonalInfoDoctor from "./components/MyProfileDoctor/PersonalInfoDoctor";
import CreatePrescription from "./components/CreateDoctor/CreatePrescription";
import PatientsContent from "./components/Patients/PatientsContent";
import HomePageDoctor from "./components/HomePageDoctor/HomePageDoctor";
import PrescriptionsDoctorSideMenu from "./components/PrescriptionsDoctor/PrescriptionsDoctorSideMenu";
import PrescriptionsDoctorContent from "./components/PrescriptionsDoctor/PrescriptionsDoctorContent";
import ProtectedRouteDoctor from "./routes/ProtectedRouteDoctor";
import ProtectedRoutePatient from "./routes/ProtectedRoutePatient";
import HomePagePatient from "./components/HomePagePatient/HomePagePatient";
import PersonalInfoPatient from "./components/MyProfilePatient/PersonalInfoPatient";
import PrescriptionsPatientContent from "./components/PrescriptionsPatient/PrescriptionsPatientContent";
import StartPage from "./components/StartPage/StartPage";
import AnalyzesPatient from "./components/AnalyzesPatient/AnalyzesPatient";
import AnalyzesDoctorSideMenu from "./components/AnalyzesDoctor/AnalyzesDoctorSideMenu";
import AnalyzesDoctorContent from "./components/AnalyzesDoctor/AnalyzesDoctorContent";
import ChatDoctorSideMenu from "./components/ChatDoctor/ChatDoctorSideMenu";
import ChatDoctor from "./components/ChatDoctor/ChatDoctor";
import ChatPatient from "./components/ChatPatient/ChatPatient";
import MedicalDrugsGraph from "./components/MedicalDrugsGraph/MedicalDrugsGraph";
import MedicalDrugsChart from "./components/MedicalDrugsChart/MedicalDrugsChart";
import MedicalDrugsChartMenu from "./components/MedicalDrugsChart/MedicalDrugsChartMenu";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.logging.value);
  const role = useSelector((state) => state.role.value);
  useEffect(() => {
    const persistentRole = sessionStorage.getItem("role");
    const persistentLogging = sessionStorage.getItem("isLoggedIn");

    if (persistentLogging) dispatch(setLogging(persistentLogging));
    if (persistentRole) dispatch(setRole(persistentRole));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
    // }
  }, [isLoggedIn, role]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/patientOrDoctor" element={<PatientOrDoctor />} />
        <Route path="/confirmEmail" element={<ConfirmationEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupPatient" element={<SignupPatient />} />
        <Route path="/signupDoctor" element={<SignupDoctor />} />
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPass/:token" element={<ResetPassword />}></Route>

        <Route
          path="menuDoctor"
          element={
            <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
              <MenuDoctor />
              <Outlet />
            </ProtectedRouteDoctor>
          }
        >
          <Route
            path="homepage"
            element={
              <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                <HomePageDoctor />
                <Outlet />
              </ProtectedRouteDoctor>
            }
          ></Route>
          <Route
            path="personalInfo"
            element={
              <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                <PersonalInfoDoctor />
              </ProtectedRouteDoctor>
            }
          />

          <Route
            path="graph"
            element={
              <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                <MedicalDrugsGraph />
              </ProtectedRouteDoctor>
            }
          ></Route>
          <Route
            path="analyzes"
            element={
              <div className="menues">
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <AnalyzesDoctorSideMenu />
                  <Outlet />
                </ProtectedRouteDoctor>
              </div>
            }
          >
            <Route
              path="for/:id"
              element={
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <AnalyzesDoctorContent />
                  <Outlet />
                </ProtectedRouteDoctor>
              }
            ></Route>
          </Route>

          <Route
            path="charts"
            element={
              <div className="menues">
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <MedicalDrugsChartMenu />
                  <Outlet />
                </ProtectedRouteDoctor>
              </div>
            }
          >
            <Route
              path="for/:id"
              element={
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <MedicalDrugsChart />
                  <Outlet />
                </ProtectedRouteDoctor>
              }
            ></Route>
          </Route>
          <Route
            path="patients"
            element={
              <div className="patients-details-container">
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <PatientsSideMenu />
                  <Outlet />
                </ProtectedRouteDoctor>
              </div>
            }
          >
            <Route
              path="patient/:id"
              element={
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <PatientsContent />
                  <Outlet />
                </ProtectedRouteDoctor>
              }
            ></Route>
          </Route>

          <Route
            path="allPrescriptions"
            element={
              <div className="patients-details-container">
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <PrescriptionsDoctorSideMenu />
                  <Outlet />
                </ProtectedRouteDoctor>
              </div>
            }
          >
            <Route
              path="forPatient/:id"
              element={
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <PrescriptionsDoctorContent />
                  <Outlet />
                </ProtectedRouteDoctor>
              }
            ></Route>
          </Route>

          <Route
            path="create"
            element={
              <div className="menues">
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <CreateDoctorSideMenu />
                  <Outlet />
                </ProtectedRouteDoctor>
              </div>
            }
          >
            <Route
              path="createPrescription/:id"
              element={
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <CreatePrescription />
                  <Outlet />
                </ProtectedRouteDoctor>
              }
            ></Route>
          </Route>

          <Route
            path="chat"
            element={
              <div className="patients-details-container">
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <ChatDoctorSideMenu />
                  <Outlet />
                </ProtectedRouteDoctor>
              </div>
            }
          >
            <Route
              path="patient/:id"
              element={
                <ProtectedRouteDoctor isLoggedIn={isLoggedIn} role={role}>
                  <ChatDoctor />
                  <Outlet />
                </ProtectedRouteDoctor>
              }
            ></Route>
          </Route>

          <Route></Route>
        </Route>

        <Route
          path="menuPatient"
          element={
            <ProtectedRoutePatient isLoggedIn={isLoggedIn} role={role}>
              <MenuPatient />
              <Outlet />
            </ProtectedRoutePatient>
          }
        >
          <Route
            path="homepage"
            element={
              <ProtectedRoutePatient isLoggedIn={isLoggedIn} role={role}>
                <HomePagePatient />
                <Outlet />
              </ProtectedRoutePatient>
            }
          ></Route>

          <Route
            path="personalInfo"
            element={
              <ProtectedRoutePatient isLoggedIn={isLoggedIn} role={role}>
                <PersonalInfoPatient />
                <Outlet />
              </ProtectedRoutePatient>
            }
          ></Route>
          <Route
            path="analyzesPatient"
            element={
              <ProtectedRoutePatient isLoggedIn={isLoggedIn} role={role}>
                <AnalyzesPatient />
              </ProtectedRoutePatient>
            }
          />
          <Route
            path="prescriptions"
            element={
              <ProtectedRoutePatient isLoggedIn={isLoggedIn} role={role}>
                <PrescriptionsPatientContent />
                <Outlet />
              </ProtectedRoutePatient>
            }
          ></Route>

          <Route
            path="chat"
            element={
              <div className="patients-details-container">
                <ProtectedRoutePatient isLoggedIn={isLoggedIn} role={role}>
                  <ChatPatient />
                  <Outlet />
                </ProtectedRoutePatient>
              </div>
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
