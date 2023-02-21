import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function AlreadyAuthenticated({ children }: { children: JSX.Element }) {
  const loginData = useAppSelector((login) => login.loginReducer.data);
  const location = useLocation();
  return loginData ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    children
  );
}
