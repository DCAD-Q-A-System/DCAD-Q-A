import React from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

import "./UsersHome.css";

export function UsersHome() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="container-1">
        <AiFillEdit
          className="icon"
          onClick={() => {
            navigate("/edit-users");
          }}
        />
        <div className="word">Edit users</div>
      </div>
      <div className="container-1">
        <AiOutlinePlus
          className="icon"
          onClick={() => navigate("/create-user")}
        />
        <div className="word">Create user</div>
      </div>
    </div>
  );
}
