import React from "react";
import "./LoginBackground.css";
export function LoginBackground({ children }: { children: JSX.Element }) {
  return <div className="bg">{children}</div>;
}
