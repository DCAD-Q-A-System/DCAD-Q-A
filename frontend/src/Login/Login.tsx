import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setData } from "../store/loginSlice";
import { LoginResponse } from "../utils/interfaces";
import "./Login.css";

import { LOGIN } from "../utils/paths";
import { useNavigate, useParams } from "react-router-dom";
import { HTTP_METHODS } from "../utils/http_methods";
import { LOCAL_STORAGE_LOGIN_KEY } from "../utils/constants";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { VARIANT } from "../utils/enums";
import { toastHook } from "../utils/toastHook";

export function Login() {
  const dispatch = useAppDispatch();
  const { type } = useParams();
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToast } = toastHook();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(LOGIN, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({
        username,
        password,
        type: type!.toUpperCase(),
      }),
    });
    if (res.status == 200) {
      const decoded: LoginResponse = await res.json();
      localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(decoded));
      dispatch(setData({ data: decoded }));
      navigate(`/home/${decoded.username}`);
    } else {
      setToast("Login error", "login wrong", VARIANT.DANGER, true);
    }
  };
  return (
    <>
      {/* <Logo /> */}
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit} className="my-4 p-4 rounded">
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button variant="primary" type="submit" className="me-md-2">
              Login
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/login")}
            >
              Return
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
