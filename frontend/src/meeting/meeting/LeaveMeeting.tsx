import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { LEAVE_MEETING } from "../../utils/paths";

export function LeaveMeeting() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.loginReducer.data);

  useEffect(() => {
    if (!loginData) {
      navigate("/", { replace: true });
      return;
    }

    const leaveMeeting = async () => {
      const res = await credentialFetch(
        LEAVE_MEETING,
        HTTP_METHODS.PUT,
        JSON.stringify({ meetingId, userId: loginData?.userId })
      );
      if (res.status === 200) {
        navigate("/meeting-list", { replace: true });
      }
    };
    leaveMeeting();
  }, []);
  return (
    <div className="spinner-parent">
      <Spinner animation="border" role="status" style={{width:"80px",height:"80px"}}>
        <span className="visually-hidden" >Loading...</span>
      </Spinner>
    </div>
  );
}
