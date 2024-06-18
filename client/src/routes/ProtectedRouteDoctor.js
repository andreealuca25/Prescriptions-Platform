import React from "react";
import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRouteDoctor({ isLoggedIn, role, children }) {
  const location = useLocation();
  if (isLoggedIn === true && role == "doctor") return children;
  else return <Navigate to={location.pathname} />;
}
