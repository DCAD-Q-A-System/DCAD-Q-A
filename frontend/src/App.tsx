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
import { LOCAL_STORAGE_LOGIN_KEY } from "./utils/constants";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setData } from "./store/loginSlice";
import { checkIfInitiallyLoggedIn } from "./utils/funcs";
import { MainMeeting } from "./meeting/meeting/MainMeeting";
import "bootstrap/dist/css/bootstrap.css";
import { GuestLogin } from "./Login/GuestLogin";
import { LoginBackground } from "./backgrounds/LoginBackground";
import { NotFound } from "./not_found/NotFound";
import { MainMeetingScratch } from "./meeting/meeting/MainMeetingScratch";

function App() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY)) {
      const getIfInitiallyLoggedIn = async () => {
        const res = await checkIfInitiallyLoggedIn();
        dispatch(setData({ data: res }));
      };
      getIfInitiallyLoggedIn();
    }
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
