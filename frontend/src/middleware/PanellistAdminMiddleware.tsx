import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { USER_TYPE } from "../utils/enums";

export function PanellistAdminMiddleware({
  children,
}: {
  children: JSX.Element;
}) {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const location = useLocation();
  return loginData &&
    (loginData.type === USER_TYPE.PANELLIST ||
      loginData.type === USER_TYPE.ADMIN) ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
