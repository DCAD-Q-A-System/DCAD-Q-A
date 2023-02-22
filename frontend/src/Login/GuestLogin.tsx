import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GuestLogin.css";
import { Form, Button } from "react-bootstrap";

export function GuestLogin() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/meeting/" + id);
  };
  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
        <Form.Group className="mb-3">
          <Form.Label>Meeting Id</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter meeting id"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Go to meeting
        </Button>
      </Form>
    </div>
  );
}
