import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Login } from "./login/Login";
import { Login2 } from "./login/Login2"
import { MeetingDetails } from "./meeting/MeetingDetails";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Login /> */}
    <MeetingDetails />
  </React.StrictMode>
);
