import React from "react";
import { Route, Navigate } from "react-router-dom";
export default function PublicRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) return children;
}
