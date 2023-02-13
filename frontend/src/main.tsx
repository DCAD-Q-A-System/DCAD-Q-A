import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Login, LoginPanel } from "./Login/LoginPanel";
import { MeetingDetails } from "./meeting/MeetingDetails";
import { PanellistHome } from "./meeting/PanellistHome";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Login /> */}
    <PanellistHome />
  </React.StrictMode>
);
