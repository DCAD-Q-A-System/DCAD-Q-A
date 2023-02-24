import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { credentialFetch } from "../../utils/credential_fetch";
import { USER_TYPE } from "../../utils/enums";
import { HTTP_METHODS } from "../../utils/http_methods";
import { JOIN_MEETING } from "../../utils/paths";

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
                
                <p className="content">
                  Start: {moment(startTime).format("LLLL")}
                </p>
                <p className="content">
                  End: {moment(endTime).format("LLLL")}
                </p>
              
            
          
        </div>
  
          <button
            className="panDiv-15"
            onClick={async () => {
              const res = await credentialFetch(
                JOIN_MEETING,
                HTTP_METHODS.PUT,
                JSON.stringify({
                  meetingId: id,
                  userId: loginData?.userId || "",
                })
              );
              if (res.status === 200) {
                navigate(`/meeting/${id}`);
              } else {
                alert("cannot join meeting");
              }
            }}
          >
            Join
          </button>
          {/* <JoinMeeting meetingId={''} userId={''} /> */}
        
        {(loginData?.type === USER_TYPE.PANELLIST ||
          loginData?.type === USER_TYPE.ADMIN) && (
          
            <button className='edit'>
                  <p className='content-1'>
                    Edit
                  </p>
                </button>
          
        )}
      </div>
    
  );
}
