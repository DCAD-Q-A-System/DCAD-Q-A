import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { credentialFetch } from "../utils/credential_fetch";
import { USER_TYPE } from "../utils/enums";
import { HTTP_METHODS } from "../utils/http_methods";
import { USER_DETAILS_TYPE } from "../utils/interfaces";
import { CREATE_USER, EDIT_USER, GET_USER } from "../utils/paths";

import "./UserDetails.css";

interface TUserDetails {
  userId: string;
  username: string;
  password: string;
  type: USER_TYPE;
}

export function UserDetails({
  userDetailsType,
}: {
  userDetailsType: USER_DETAILS_TYPE;
}) {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState<TUserDetails>({
    username: "",
    userId: "",
    password: "",
    type: USER_TYPE.STUDENT,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(USER_TYPE.STUDENT);

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetailsType === USER_DETAILS_TYPE.EDIT && userId) {
      const getUser = async () => {
        const res = await credentialFetch(GET_USER + userId);
        const data: TUserDetails = res.data;
        setUsername(data.username);
        setPassword(data.password);
        setUserType(data.type);
        setUserDetails(data);
      };
      getUser();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    if (username === "" || password === "") {
      alert("can't leave them blank");
      return;
    }
    if (userDetailsType === USER_DETAILS_TYPE.CREATE) {
      const res = await credentialFetch(
        CREATE_USER,
        HTTP_METHODS.POST,
        JSON.stringify({
          username: username,
          password: password,
          type: userType,
        })
      );
      console.log(res.status);
      if (res.status === 200) {
        alert("Successful creation of user");
      } else if (res.status === 409) {
        alert("username already taken");
      } else {
        alert("something went wrong. check details");
      }
    } else if (userDetailsType === USER_DETAILS_TYPE.EDIT) {
      const res = await credentialFetch(
        EDIT_USER,
        HTTP_METHODS.POST,
        JSON.stringify({
          userId: "",
          username: username,
          password: password,
          type: userType,
        })
      );
      if (res.status === 200) {
        alert("successful edit!");
        navigate(-1);
      } else if (res.status === 409) {
        alert("username already taken");
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
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

        <Form.Group className="mb-4" controlId="formSelect">
          <Form.Label className="fs-3">Username</Form.Label>
          <Form.Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option>{USER_TYPE.STUDENT} </option>
            <option>{USER_TYPE.PANELLIST} </option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="fs-4 mt-4">
          Submit
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="fs-4 mt-4"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
      </Form>
    </div>
  );
}
