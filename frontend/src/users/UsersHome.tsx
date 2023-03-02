import React, { useState } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Menu } from "./Menu";

import "./UsersHome.css";

export function UsersHome() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(true)
  return (
    <div className="container"
    onClick={()=>isOpen == false ? setIsOpen(!isOpen) : ""}>
      <Menu path="/" isOpen={isOpen} setIsOpen={setIsOpen} />
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
