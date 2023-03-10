import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setData } from "../store/loginSlice";
import { LOCAL_STORAGE_LOGIN_KEY } from "../utils/constants";
import { credentialFetch } from "../utils/credential_fetch";
import { HTTP_METHODS } from "../utils/http_methods";
import { LOGOUT } from "../utils/paths";

export function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      const res = await credentialFetch(LOGOUT, HTTP_METHODS.POST);
      if (res.status === 200) {
        await dispatch(setData({ data: null }));
        localStorage.removeItem(LOCAL_STORAGE_LOGIN_KEY);
        navigate("/login", { replace: true });
      }
    }
    logout();
  }, []);
  return (
    <div className="spinner-parent">
      <Spinner animation="border" role="status" style={{width:"80px",height:"80px"}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
