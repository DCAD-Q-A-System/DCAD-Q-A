import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { credentialFetch } from "../../../utils/credential_fetch";
import { HTTP_METHODS } from "../../../utils/http_methods";
import { JOIN_MEETING } from "../../../utils/paths";
import "./JoinMeeting.css";

export type JoinMeetingProps = {
  meetingId: string;
};

export function JoinMeeting({ meetingId }: JoinMeetingProps) {
  const navigate = useNavigate();
  const loginData = useAppSelector((state) => state.loginReducer.data);

  // const handleJoinMeeting = async () => {
  //   try {
  //     const response = await fetch(JOIN_MEETING, {
  //       method: HTTP_METHODS.GET,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ meetingId, userId }),
  //     });

  //     if (response.ok) {
  //       navigate("/");
  //     } else {
  //       console.error("Error activating event link.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleJoinMeeting = async () => {
    const res = await credentialFetch(
      JOIN_MEETING,
      HTTP_METHODS.PUT,
      JSON.stringify({
        meetingId: meetingId,
        userId: loginData?.userId || "",
      })
    );
    if (res.status === 200) {
      navigate(`/meeting/${meetingId}`);
    } else {
      alert("cannot join meeting");
    }
  }


  return (
    <div className="panColumn-3">
      <button onClick={handleJoinMeeting} className="div-8">
        Join
      </button>
    </div>
  );
}
