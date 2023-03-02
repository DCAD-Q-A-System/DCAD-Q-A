import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { credentialFetch } from "../utils/credential_fetch";
import { USER_TYPE } from "../utils/enums";
import { USER_DETAILS_TYPE } from "../utils/interfaces";
import { GET_USER } from "../utils/paths";

import "./UserDetails.css";



interface TUserDetails {
  userId: string;
  username: string;
  password: string;
  type: USER_TYPE;
}

export function UserDetails({
  userDetailsType,
  userId,
}: {
    userDetailsType: USER_DETAILS_TYPE;
    userId?: string;
}) {
  const [userDetails, setUserDetails] = useState<TUserDetails>({
    username: "",
    userId: "",
    password: "",
    type: USER_TYPE.STUDENT,
  });
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [userType,setUserType] = useState(USER_TYPE.STUDENT);

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetailsType === USER_DETAILS_TYPE.EDIT && userId) {
      const getUser = async () => {
        const res = await credentialFetch(GET_USER);
        const data: TUserDetails = res.data;
        setUsername(data.username);
        setPassword(data.password);
        setUserType(data.type);
        setUserDetails(data);
      };
      getUser();
    }
  }, []);

  const handleSubmit = () => {
    console.log("submitted");
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label className="fs-3">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => }
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

        <Form.Group className="mb-4" controlId="formSelect">
          <Form.Label className="fs-3">Username</Form.Label>
          <Form.Select value={userType} onChange={(e)=>setUserType(e.target.value)}>
            <option>{USER_TYPE.STUDENT} </option>
            <option>{USER_TYPE.PANELLIST} </option>
            <option>{USER_TYPE.ADMIN} </option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="fs-4 mt-4">
          Submit
        </Button>
        <Button
          variant="secondary"
          type="submit"
          className="fs-4 mt-4"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
      </Form>
    </div>
  );
}
