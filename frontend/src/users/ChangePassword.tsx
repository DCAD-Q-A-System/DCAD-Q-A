import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { credentialFetch } from "../utils/credential_fetch";
import { HTTP_METHODS } from "../utils/http_methods";
import { EDIT_USER_PASSWORD } from "../utils/paths";

export function ChangePassword() {
  const { userId } = useParams();
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === checkPassword && password) {
      const res = await credentialFetch(
        EDIT_USER_PASSWORD,
        HTTP_METHODS.PUT,
        JSON.stringify({ userId, password })
      );
      if (res.status === 200) {
        alert("successfully changed password");
        navigate(`/edit-user/${userId}`);
      } else {
        alert("something has gone wrong");
      }
    } else {
      alert("check passwords again");
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center">
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
    </div>
  );
}
