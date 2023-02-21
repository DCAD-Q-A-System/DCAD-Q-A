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
    <div className="panDiv-10">
      <div className="builder-columns panDiv-11">
        <div className="builder-column panColumn">
          <div className="panDiv-12">
            <div className="builder-columns panDiv-13">
              <div className="builder-column panColumn-5">
                <div className="panDiv-14">Name: {name}</div>
                <div className="panDiv-14">
                  Start: {moment(startTime).format("LLLL")}
                </div>
                <div className="panDiv-14">
                  End: {moment(endTime).format("LLLL")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="builder-column panColumn-6">
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
        </div>
        {(loginData?.type === USER_TYPE.PANELLIST ||
          loginData?.type === USER_TYPE.ADMIN) && (
          <div className="builder-column panColumn-7">
            <div className="panDiv-16">Edit</div>
          </div>
        )}
      </div>
    </div>
  );
}
