import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setData } from "../store/loginSlice";
import { sha256 } from "crypto-hash";
import jwt_decode from "jwt-decode";
import { JWT, LoginResponse } from "../utils/interfaces";
import "./Login.css";

import logo from "../image/Meeting.jpg";
import { LOGIN } from "../utils/paths";
import { useNavigate } from "react-router-dom";

export function Login({ type }: { type: USER_TYPE }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Hash function implement later
    const pass = await sha256(password);
    const res = await fetch(LOGIN, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ username, password: pass, reqType: type }),
    });
    const decoded: LoginResponse = await res.json();
    dispatch(setData({ data: decoded }));
    navigate();
  };
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">
            <div className="builder-columns div-4">
              <div className="builder-column column">
                <div className="div-5">
                  <picture>
                    <img loading="lazy" src={logo} className="image" />
                  </picture>
                  <div className="builder-image-sizer image-sizer"></div>
                </div>
              </div>
              <div className="builder-column column-2">
                <div className="welcome-to-the-online-q-a-syst">
                  Welcome to the online Q&A system
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="div-6">
            <div className="builder-columns div-7">
              <div className="builder-column column-3">
                <div className="div-8">
                  <div className="div-9">
                    <label className="div-10">Username:</label>
                    <input
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      className="div-11"
                    />
                  </div>
                  <div className="div-12">
                    <label className="div-13">Password:</label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="div-14"
                    />
                  </div>
                  <button type="submit" className="div-15">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
