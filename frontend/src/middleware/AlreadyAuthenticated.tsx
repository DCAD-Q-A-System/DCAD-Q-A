import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export function AlreadyAuthenticated({ children }: { children: JSX.Element }) {
  const loginData = useAppSelector((login) => login.loginReducer.data);
  const location = useLocation();
  location.pathname;
  return loginData ? (
    <Navigate to={location.pathname} state={{ from: location }} replace />
  ) : (
    children
  );
}
