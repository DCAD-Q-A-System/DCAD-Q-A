import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE } from "../../utils/enums";
import { GET_ALL_MEETINGS, JOIN_MEETING } from "../../utils/paths";
import { JoinMeeting } from "./join_meeting/JoinMeeting";
import moment from "moment";
import { Button } from "react-bootstrap";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { MeetingIds } from "../../utils/interfaces";

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
  const deleteMeetings = async () => {
    const response = await credentialFetch(
      `${GET_ALL_MEETINGS}?id=${id}`,
      HTTP_METHODS.DELETE
    );
    if (response.status === 404) {
    } else {
      alert("something went wrong deleting meetings");
    }
  };

  return (
    <div className="box1">
      <div className="box2">
        <div className="box3 ">
        <p className="content">Meeting:<br />{name}</p>
        </div>
        <div className="box4"> 
          <div className="box5">
            <p className="content-item">
              Start: {moment(startTime).format("LLLL")}
            </p>        
          </div> 
          <div className="box6">
            <p className="content-item">End: {moment(endTime).format("LLLL")}</p> 
          </div>        
        </div>
        {/* <p className="content-item">
          Start: {moment(startTime).format("LLLL")}
        </p>
        <p className="content-item">End: {moment(endTime).format("LLLL")}</p> 
        */}
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
          <p className="content-1 fs-2">Edit</p>
        </button>
      )}
      {loginData?.type === USER_TYPE.ADMIN && (
        <button
          className="delete"
          onClick={() => {
            deleteMeetings;
          }}
        >
          <p className="content-1 fs-2">Delete</p>
        </button>
      )}
    </div>
  );
}
function setIds(data: MeetingIds) {
  throw new Error("Function not implemented.");
}
