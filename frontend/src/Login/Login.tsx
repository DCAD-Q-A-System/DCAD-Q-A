import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setData } from "../store/loginSlice";
import { LoginResponse } from "../utils/interfaces";
import "./Login.css";

import logo from "../image/Meeting.jpg";
import login from "../image/Login.jpg";
import { LOGIN } from "../utils/paths";
import { useNavigate, useParams } from "react-router-dom";
import { HTTP_METHODS } from "../utils/http_methods";
import { LOCAL_STORAGE_LOGIN_KEY } from "../utils/constants";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Logo } from "../backgrounds/Logo";

export function Login() {
  const dispatch = useAppDispatch();
  const { type } = useParams();
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/home");
    } else {
      alert("login wrong");
    }
  };
  return (
    <>
      {/* <Logo /> */}
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form
          onSubmit={handleSubmit}
          className="rounded p-4 p-sm-3"
          style={{ height: "400px" }}
        >
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label className="fs-3">Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="p-3 fs-4"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="fs-3">Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-3 fs-4"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="fs-4 mt-4">
            Submit
          </Button>
          <Button
            variant="secondary"
            type="submit"
            className="fs-4 mt-4"
            style={{ marginLeft: "2%" }}
            onClick={() => navigate("/login")}
          >
            Return
          </Button>
        </Form>
      </div>
    </>
  );
}
