import { useEffect } from "react";

import "./App.css";
import { Route, Routes } from "react-router";
import { AuthenticatorMiddleware } from "./middleware/AuthenticatorMiddleware";
import { Home } from "./home/Home";
import { LoginPanel } from "./tmp/LoginPanel";
import { Login } from "./tmp/Login";
import { AlreadyAuthenticated } from "./middleware/AlreadyAuthenticated";
import { MeetingList } from "./meeting/meeting/MeetingList";
import { AXIOS_INSTANCE, LOCAL_STORAGE_LOGIN_KEY } from "./utils/constants";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setData } from "./store/loginSlice";
import { checkIfInitiallyLoggedIn } from "./utils/funcs";
import "bootstrap/dist/css/bootstrap.css";
import { GuestLogin } from "./tmp/GuestLogin";
import { LoginBackground } from "./backgrounds/LoginBackground";
import { NotFound } from "./not_found/NotFound";
import { MainMeetingScratch } from "./meeting/meeting/MainMeetingScratch";
import { Logout } from "./tmp/Logout";

import { LeaveMeeting } from "./meeting/meeting/LeaveMeeting";
import { MeetingBackground } from "./backgrounds/MeetingBackground";
import { MeetingDetails } from "./meeting/meeting/MeetingDetails";
import { Toast, ToastContainer } from "react-bootstrap";
import { AdminMiddleware } from "./middleware/AdminMiddleware";
import { UsersHome } from "./users/UsersHome";
import { EditUsers } from "./users/EditUsers";
import { UserDetails } from "./users/UserDetails";
import { DETAILS_TYPE } from "./utils/interfaces";
import {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { ChangePassword } from "./users/ChangePassword";
import { GlobalModal } from "./modal/GlobalModal";
import { setContent, setShow, setTitle } from "./store/toastSlice";
import { PanellistAdminMiddleware } from "./middleware/PanellistAdminMiddleware";
import { VARIANT } from "./utils/enums";
import { toastHook } from "./utils/toastHook";

function App() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const toastData = useAppSelector((s) => s.toastReducer);
  const { setToast } = toastHook();
  const dispatch = useAppDispatch();

  useEffect(() => {
    AXIOS_INSTANCE.interceptors.response.use(
      (r) => r,
      (error: AxiosError) => {
        console.log("INTERCEPTED", error);
        if (!error.response) {
          setToast(
            "Network error",
            "network error, check connection",
            VARIANT.DANGER,
            true
          );
        } else {
          switch (error.response.status) {
            case 400:
              setToast(
                "General error",
                "check your details",
                VARIANT.DANGER,
                true
              );
              break;
            case 500:
              setToast(
                "Server error",
                "Server error, contact admin",
                VARIANT.DANGER,
                true
              );
              break;
            case 409:
              setToast(
                "General error",
                "Credentials already used",
                VARIANT.DANGER,
                true
              );
              break;
          }
        }
        return Promise.reject(error);
      }
    );
    AXIOS_INSTANCE.interceptors.request.use(
      (r: InternalAxiosRequestConfig<any>) => r,
      (error: AxiosError) => {
        if (!error.request) {
          setToast(
            "Network error",
            "network error, check connection",
            VARIANT.DANGER,
            true
          );
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
            <PanellistAdminMiddleware>
              <MeetingBackground>
                <MeetingDetails detailsType={DETAILS_TYPE.CREATE} />
              </MeetingBackground>
            </PanellistAdminMiddleware>
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
            <PanellistAdminMiddleware>
              <MeetingBackground>
                <MeetingDetails detailsType={DETAILS_TYPE.EDIT} />
              </MeetingBackground>
            </PanellistAdminMiddleware>
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

      {toastData.show && (
        <ToastContainer className="p-3" position="top-center">
          <Toast
            bg={toastData.variant}
            show={toastData.show}
            onClose={() => {
              setToast("", "", "", false);
            }}
            delay={10000}
            autohide
          >
            <Toast.Header closeButton>
              <strong className="me-auto">{toastData.title}</strong>
            </Toast.Header>
            <Toast.Body>{toastData.content}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
}

export default App;
