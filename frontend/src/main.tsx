import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LoginPanel } from "./Login/LoginPanel";
import { Login } from "./Login/Login";
import { MeetingDetails } from "./meeting/meeting/MeetingDetails";
import { MeetingListStudent } from "./meeting/meeting/MeetingList";
import { PanellistHome } from "./meeting/panellist/PanellistHome";
import { MainMeeting } from "./meeting/meeting/MainMeeting";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Login /> */}
    {/* <MainMeeting /> */}
    <Login/>
  </React.StrictMode>
);
