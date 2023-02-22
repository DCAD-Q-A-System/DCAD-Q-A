import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Router, Routes } from "react-router";
import { AuthenticatorMiddleware } from "./middleware/AuthenticatorMiddleware";
import { Home } from "./home/Home";
import { LoginPanel } from "./login/LoginPanel";
import { Login } from "./login/Login";
import { AlreadyAuthenticated } from "./middleware/AlreadyAuthenticated";
import { MeetingList } from "./meeting/meeting/MeetingList";
import { LOCAL_STORAGE_LOGIN_KEY, socket } from "./utils/constants";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setData } from "./store/loginSlice";
import { checkIfInitiallyLoggedIn } from "./utils/funcs";
import { MainMeeting } from "./meeting/meeting/MainMeeting";
import "bootstrap/dist/css/bootstrap.css";
import { GuestLogin } from "./Login/GuestLogin";
import { LoginBackground } from "./backgrounds/LoginBackground";
import { NotFound } from "./not_found/NotFound";
import { MainMeetingScratch } from "./meeting/meeting/MainMeetingScratch";
import { Logout } from "./Login/Logout";

import { io } from "socket.io-client";
import { LeaveMeeting } from "./meeting/meeting/LeaveMeeting";

function App() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const dispatch = useAppDispatch();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLasPong] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY)) {
      const getIfInitiallyLoggedIn = async () => {
        const res = await checkIfInitiallyLoggedIn();
        dispatch(setData({ data: res }));
      };
      getIfInitiallyLoggedIn();
    }
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLasPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatorMiddleware>
              <Home />
            </AuthenticatorMiddleware>
          }
        />
        <Route
          path="/login"
          element={
            <AlreadyAuthenticated>
              <LoginBackground>
                <LoginPanel />
              </LoginBackground>
            </AlreadyAuthenticated>
          }
        />
        <Route
          path="/login/guest"
          element={
            <AlreadyAuthenticated>
              <LoginBackground>
                <GuestLogin />
              </LoginBackground>
            </AlreadyAuthenticated>
          }
        />
        <Route
          path="/login/:type"
          element={
            <AlreadyAuthenticated>
              <LoginBackground>
                <Login />
              </LoginBackground>
            </AlreadyAuthenticated>
          }
        />
        <Route
          path="/meeting-list"
          element={
            <AuthenticatorMiddleware>
              <MeetingList />
            </AuthenticatorMiddleware>
          }
        />
        <Route
          path="/home"
          element={
            <AuthenticatorMiddleware>
              <Home />
            </AuthenticatorMiddleware>
          }
        />

        <Route
          path="/meeting/:meetingId"
          element={
            // <AuthenticatorMiddleware>
            <MainMeetingScratch />
            // </AuthenticatorMiddleware>
          }
        />
        <Route path="/leave-meeting/:meetingId" element={<LeaveMeeting />} />
        <Route
          path="/logout"
          element={
            <AuthenticatorMiddleware>
              <Logout />
            </AuthenticatorMiddleware>
          }
        />
        <Route
          path="*"
          element={
            <LoginBackground>
              <NotFound />
            </LoginBackground>
          }
        />
        {/* <Route path="meeting-scratch" element={<MainMeetingScratch />} /> */}
      </Routes>
    </div>
  );
}

export default App;
