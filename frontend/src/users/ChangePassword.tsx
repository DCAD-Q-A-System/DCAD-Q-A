import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setContent, setShow, setTitle, setVariant } from "../store/toastSlice";
import { credentialFetch } from "../utils/credential_fetch";
import { VARIANT } from "../utils/enums";
import { HTTP_METHODS } from "../utils/http_methods";
import { EDIT_USER_PASSWORD } from "../utils/paths";
import "./ChangePassword.css";
import { toastHook } from "../utils/toastHook";

export function ChangePassword() {
  const { userId } = useParams();
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  const { setToast } = toastHook();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === checkPassword && password) {
      const res = await credentialFetch(
        EDIT_USER_PASSWORD,
        HTTP_METHODS.PUT,
        JSON.stringify({ userId, password })
      );
      if (res.status === 200) {
        dispatch(setContent("successfully changed password"));
        dispatch(setTitle("Success"));
        dispatch(setVariant("success"));
        dispatch(setShow(true));

        navigate(`/edit-user/${userId}`);
      } else {
        setToast(
          "General error",
          "something has gone wrong",
          VARIANT.DANGER,
          true
        );
      }
    } else {
      setToast("Form error", "Check passwords", VARIANT.DANGER, true);
    }
  };

  return (
    <Container className="cp-form d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
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

        <Form.Group className="mb-4">
          <Form.Label className="fs-3">Re-enter Password</Form.Label>
          <Form.Control
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            type="password"
            placeholder="Check Password"
            className="p-3 fs-4"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Change Password
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(`/edit-user/${userId}`)}
        >
          Return
        </Button>
      </Form>
    </Container>
  );
}
