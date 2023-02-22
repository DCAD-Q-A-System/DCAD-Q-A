import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { MeetingIds } from "../../utils/interfaces";
import { GET_ALL_MEETINGS, GET_ALL_MESSAGES } from "../../utils/paths";
import { JoinMeeting } from "../components/join_meeting/JoinMeeting";
import { MeetingItem } from "../components/MeetingItem";
import "./MeetingList.css";

export function MeetingList() {
  const [ids, setIds] = useState<MeetingIds | null>(null);
  const loginData = useAppSelector((state) => state.loginReducer.data);
  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await credentialFetch(
        `${GET_ALL_MEETINGS}?userId=${loginData?.userId || ""}`,
        HTTP_METHODS.GET
      );

      if (res.status === 200) {
        const data: MeetingIds = res.data;
        setIds(data);
      } else {
        alert("something went wrong fetching meetings");
      }
    };
    fetchMeetings();
  }, []);
  console.log(ids);
  return (
    <>
      <div className="panDiv">
        <div className="panDiv-2">
          {ids && ids.ids.length > 0 ? (
            ids.ids.map(({ name, id, startTime, endTime }) => {
              return (
                <MeetingItem
                  key={id}
                  id={id}
                  name={name}
                  startTime={startTime}
                  endTime={endTime}
                />
              );
            })
          ) : ids?.ids.length === 0 ? (
            <div>
              <p>No meetings assigned</p>
            </div>
          ) : (
            <div>
              <p>Can't fetch meetings at the moment</p>
              <p>Try again later</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
