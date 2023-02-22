import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setData } from "../store/loginSlice";
import { JWT, LoginResponse } from "../utils/interfaces";
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
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
