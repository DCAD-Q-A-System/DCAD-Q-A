import React from "react";
import { useNavigate } from "react-router-dom";
import { HTTP_METHODS } from "../../../utils/http_methods";
import { JOIN_MEETING } from "../../../utils/paths";
import "./JoinMeeting.css";

export type JoinMeetingProps = {
  meetingId: string;
  userId: string;
};

export function JoinMeeting({ meetingId, userId }: JoinMeetingProps) {
  const navigate = useNavigate();
  const handleJoinMeeting = async () => {
    try {
      const response = await fetch(JOIN_MEETING, {
        method: HTTP_METHODS.GET,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId, userId }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error activating event link.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="builder-column stuColumn-3">
      <button onClick={handleJoinMeeting} className="div-8">
        Join
      </button>
    </div>
  );
}
