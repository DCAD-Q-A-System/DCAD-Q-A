import { useEffect, useState } from "react";
import { credentialFetch } from "../../utils/credential_fetch";
import { MeetingIds } from "../../utils/interfaces";
import { JoinMeeting } from "../components/join_meeting/JoinMeeting";
import "./MeetingList.css";

export function MeetingList() {
  const [ids, setIds] = useState<MeetingIds>([]);
  useEffect(() => {
    credentialFetch();
  }, []);
  return (
    <>
      <div className="panDiv">
        <div className="panDiv-2"></div>
      </div>
    </>
  );
}
