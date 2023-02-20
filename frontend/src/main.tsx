import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LoginPanel } from "./login/LoginPanel";
import { MeetingDetails } from "./meeting/meeting/MeetingDetails";
import { PanellistHome } from "./home/Home";
import { MainMeeting } from "./meeting/meeting/MainMeeting";
import { MeetingListPanellist } from "./meeting/meeting/MeetingList";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Login /> */}
    {/* <MainMeeting /> */}
    <MeetingListPanellist />
  </React.StrictMode>
);
