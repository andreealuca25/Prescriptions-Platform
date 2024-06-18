import React from "react";
import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRoutePatient({ isLoggedIn, role, children }) {
  const location = useLocation();
  if (isLoggedIn === true && role == "patient") return children;
  else return <Navigate to={location.pathname} />;
}
