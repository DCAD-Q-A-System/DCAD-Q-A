import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";
import { HTTP_METHODS } from "../../utils/http_methods";
import { JOIN_MEETING } from "../../utils/paths";
import { JoinMeeting } from "./join_meeting/JoinMeeting";
import moment from "moment";
import { Button } from "react-bootstrap";

export function MeetingItem({
  id,
  name,
  startTime,
  endTime,
}: {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}) {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();
  return (
    <div className="box1">
      <div className="box2">
        <p className="content">Name: {name}</p>
        <p className="content-item">
          Start: {moment(startTime).format("LLLL")}
        </p>
        <p className="content-item">End: {moment(endTime).format("LLLL")}</p>
      </div>

      <JoinMeeting meetingId={`${id}`} />

      {(loginData?.type === USER_TYPE.PANELLIST ||
        loginData?.type === USER_TYPE.ADMIN) && (
        <button
          className="edit"
          onClick={() => {
            navigate(`/edit-meeting/${id}`);
          }}
        >
          <p className="content-1">Edit</p>
        </button>
      )}
    </div>
  );
}
