import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { USER_TYPE, VARIANT } from "../../utils/enums";
import { JoinMeeting } from "./join_meeting/JoinMeeting";
import moment from "moment";
import { MeetingIds } from "../../utils/interfaces";
import { toastHook } from "../../utils/toastHook";

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
  const { setToast } = toastHook();
  const handleClick = async () => {
    // const link = `${
    //   window.location.protocol + "//" + window.location.host
    // }/meeting/${id}`;
    const link = `${id}`;
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(link);
      setToast(
        "Success",
        "Copied meeting link to clipboard!",
        VARIANT.SUCCESS,
        true
      );
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = link;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (error) {
        setToast(
          "Clipboard error",
          "Cannot access clipboard right now",
          VARIANT.DANGER,
          true
        );
        return;
      } finally {
        textArea.remove();
      }

      setToast(
        "Success",
        "Copied meeting link to clipboard!",
        VARIANT.SUCCESS,
        true
      );
    }
  };
  return (
    <div className="box1">
      <div className="box2">
        <div className="box3 ">
          <p className="content">{name}</p>
          <p className="content-item">
            Start: {moment(startTime).format("LLLL")}
          </p>
          <p className="content-item">End: {moment(endTime).format("LLLL")}</p>
        </div>
      </div>
      <JoinMeeting meetingId={`${id}`} />

      <button className="share" onClick={handleClick}>
        {/* <p className="content-1">Share</p> */}
        Share
      </button>

      {(loginData?.type === USER_TYPE.PANELLIST ||
        loginData?.type === USER_TYPE.ADMIN) && (
        <button
          className="edit"
          onClick={() => {
            navigate(`/edit-meeting/${id}`);
          }}
        >
          {/* <p className="content-1 fs-2">Edit</p> */}
          Edit
        </button>
      )}
    </div>
  );
}
function setIds(data: MeetingIds) {
  throw new Error("Function not implemented.");
}
