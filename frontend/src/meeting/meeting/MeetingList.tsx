import { useEffect, useState } from "react";
import { credentialFetch } from "../../utils/credential_fetch";
import { MeetingIds } from "../../utils/interfaces";
import { GET_ALL_MEETINGS, GET_ALL_MESSAGES } from "../../utils/paths";
import { JoinMeeting } from "../components/join_meeting/JoinMeeting";
import { MeetingItem } from "../components/MeetingItem";
import "./MeetingList.css";

export function MeetingList() {
  const [ids, setIds] = useState<MeetingIds>({ ids: [] });

  // useEffect(() => {
  //   const fetchMeetings = async () => {
  //     const res = await credentialFetch(GET_ALL_MEETINGS);
  //     if (res.status === 200) {
  //       const data: MeetingIds = await res.json();
  //       setIds(data);
  //     }
  //   };
  //   fetchMeetings();
  // }, [ids, setIds]);

  return (
    <>
      <div className="panDiv">
        <div className="panDiv-2">
          {ids.ids.map(({ name, id, startTime, endTime }) => {
            return (
              <MeetingItem
                id={id}
                name={name}
                startTime={startTime}
                endTime={endTime}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
