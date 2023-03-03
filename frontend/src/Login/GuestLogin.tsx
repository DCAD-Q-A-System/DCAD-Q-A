import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GuestLogin.css";
import { Form, Button } from "react-bootstrap";
import { Logo } from "../backgrounds/Logo";

export function GuestLogin() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/meeting/" + id);
  };
  return (
  <>
    <Logo />
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="rounded p-4 form-control-sm form">
        <Form.Group className="mb-3">
          <Form.Label className="fs-3">Meeting Id</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter meeting id"
            className="text fs-3"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn btn-lg fs-4">
          Go to meeting
        </Button>
        <Button variant="secondary" 
        className="btn btn-lg fs-4 m-3"
        onClick={()=>navigate('/login')}>
          Return
        </Button>
      </Form>
    </div>
  </>
);
}
