import React, { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Router, Routes } from "react-router";
import { AuthenticatorMiddleware } from "./middleware/AuthenticatorMiddleware";
import { Home } from "./home/Home";
import { LoginPanel } from "./login/LoginPanel";
import { Login } from "./login/Login";
import { AlreadyAuthenticated } from "./middleware/AlreadyAuthenticated";
import { MeetingList } from "./meeting/meeting/MeetingList";
import {
  AXIOS_INSTANCE,
  LOCAL_STORAGE_LOGIN_KEY,
  socket,
} from "./utils/constants";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setData } from "./store/loginSlice";
import { checkIfInitiallyLoggedIn } from "./utils/funcs";
import { MainMeeting } from "./meeting/meeting/MainMeeting";
import "bootstrap/dist/css/bootstrap.css";
import { GuestLogin } from "./login/GuestLogin";
import { LoginBackground } from "./backgrounds/LoginBackground";
import { NotFound } from "./not_found/NotFound";
import { MainMeetingScratch } from "./meeting/meeting/MainMeetingScratch";
import { Logout } from "./login/Logout";

import { LeaveMeeting } from "./meeting/meeting/LeaveMeeting";
import { MeetingBackground } from "./backgrounds/MeetingBackground";
import { MeetingDetails } from "./meeting/meeting/MeetingDetails";
import { MainMeetingB } from "./meeting/meeting/MainMeetingB";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AdminMiddleware } from "./middleware/AdminMiddleware";
import { UsersHome } from "./users/UsersHome";
import { EditUsers } from "./users/EditUsers";
import { UserDetails } from "./users/UserDetails";
import { DETAILS_TYPE } from "./utils/interfaces";
import { AxiosError, AxiosRequestConfig } from "axios";
import { ChangePassword } from "./users/ChangePassword";
import { GlobalModal } from "./modal/GlobalModal";

function App() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    AXIOS_INSTANCE.interceptors.response.use(
      (r) => r,
      (error: AxiosError) => {
        console.log("INTERCEPTED", error);
        if (!error.response) {
          alert("network error, check connection");
        } else {
          switch (error.response.status) {
            case 400:
              alert("check your details");
              break;
            case 500:
              alert("Server error, contact admin");
              break;
            case 409:
              alert("Credentials already used");
              break;
          }
        }
        return Promise.reject(error);
      }
    );
    AXIOS_INSTANCE.interceptors.request.use(
      (r: AxiosRequestConfig) => r,
      (error: AxiosError) => {
        if (!error.request) {
          alert("network error, check connection");
        }
        return Promise.reject(error);
      }
    );
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
      {/* {isOpen && <GlobalModal pShow={isOpen} />} */}

      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatorMiddleware>
              <MeetingBackground>
                <Home />
              </MeetingBackground>
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
              <MeetingBackground>
                <MeetingList />
              </MeetingBackground>
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
          path="/home"
          element={
            <AuthenticatorMiddleware>
              <LoginBackground>
                <Home />
              </LoginBackground>
            </AuthenticatorMiddleware>
          }
        />

        <Route
          path="/create-meeting"
          element={
            <AuthenticatorMiddleware>
              <MeetingBackground>
                <MeetingDetails detailsType={DETAILS_TYPE.CREATE} />
              </MeetingBackground>
            </AuthenticatorMiddleware>
          }
        />

        <Route
          path="/users-home"
          element={
            <AdminMiddleware>
              <MeetingBackground>
                <UsersHome />
              </MeetingBackground>
            </AdminMiddleware>
          }
        />
        <Route
          path="/edit-users"
          element={
            <AdminMiddleware>
              <MeetingBackground>
                <EditUsers />
              </MeetingBackground>
            </AdminMiddleware>
          }
        />
        <Route
          path="/create-user"
          element={
            <AdminMiddleware>
              <MeetingBackground>
                <UserDetails userDetailsType={DETAILS_TYPE.CREATE} />
              </MeetingBackground>
            </AdminMiddleware>
          }
        />

        <Route
          path="/change-password/:userId"
          element={
            <AdminMiddleware>
              <MeetingBackground>
                <ChangePassword />
              </MeetingBackground>
            </AdminMiddleware>
          }
        />

        <Route
          path="/edit-user/:userId"
          element={
            <AdminMiddleware>
              <MeetingBackground>
                <UserDetails userDetailsType={DETAILS_TYPE.EDIT} />
              </MeetingBackground>
            </AdminMiddleware>
          }
        />
        <Route
          path="/edit-meeting/:meetingId"
          element={
            <AdminMiddleware>
              <MeetingBackground>
                <MeetingDetails detailsType={DETAILS_TYPE.EDIT} />
              </MeetingBackground>
            </AdminMiddleware>
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
      </Routes>
    </div>
  );
}

export default App;
