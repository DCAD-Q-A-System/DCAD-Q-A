import { useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticatorMiddleware>
                <Home />
              </AuthenticatorMiddleware>
            }
          />
          {/* To be filled in */}
          <Route
            path="/login"
            element={
              <AlreadyAuthenticated>
                <LoginPanel />
              </AlreadyAuthenticated>
            }
          />
          <Route
            path="/login/:type"
            element={
              <AlreadyAuthenticated>
                <Login />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
