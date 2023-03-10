import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import "./JoinMeeting.css";

export type JoinMeetingProps = {
  meetingId: string;
};

export function JoinMeeting({ meetingId }: JoinMeetingProps) {
  const navigate = useNavigate();

  const handleJoinMeeting = async () => {
    navigate(`/meeting/${meetingId}`);
  };

  return (
    <button onClick={handleJoinMeeting} className="div-8">
      Join
    </button>
  );
}
