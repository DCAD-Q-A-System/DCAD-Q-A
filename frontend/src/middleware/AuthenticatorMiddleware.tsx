import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Navigate, redirect, useLocation } from "react-router-dom";

export function AuthenticatorMiddleware({
  children,
}: {
  children: JSX.Element;
}) {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const location = useLocation();
  console.log(loginData);
  return loginData ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
