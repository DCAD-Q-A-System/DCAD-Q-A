import React, { useState } from "react";
import "./Vote.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReconnectingWebSocket from "reconnecting-websocket";
import { ISocketMessageSend, REQ_TYPES } from "../utils/socket_types";
import { useAppSelector } from "../store/hooks";
import { isOpen, jsonToArray } from "../utils/funcs";
import { VARIANT } from "../utils/enums";
import { toastHook } from "../utils/toastHook";

export function Vote({
  meetingId,
  questionId,
  voteCount,
  socket,
}: {
  meetingId: string;
  questionId: string;
  voteCount: number;
  socket: ReconnectingWebSocket;
}) {
  const loginData = useAppSelector((s) => s.loginReducer.data);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const { setToast } = toastHook();

  const handleUpVote = () => {
    if (!upVoted) {
      sendSocketMsg(1);
      setUpVoted(true);
      setDownVoted(false);
    }
  };

  const handleDownVote = () => {
    if (!downVoted) {
      sendSocketMsg(-1);
      setDownVoted(true);
      setUpVoted(false);
    }
  };

  const sendSocketMsg = (vote: number) => {
    const socketMsg: ISocketMessageSend = {
      reqType: REQ_TYPES.CHANGE_VOTE_COUNT,
      meetingId,
      questionId,
      userId: loginData?.userId || "",
      username: loginData?.username,
      voteCount: vote,
    };
    if (!isOpen(socket)) {
      setToast("Socket error", "socket not connected!", VARIANT.DANGER, true);
      return;
    }
    const bytes = jsonToArray(socketMsg);
    socket.send(bytes);
  };

  return (
    <div>
      <i id="upvote" className="bi bi-arrow-up-circle" onClick={handleUpVote} />
      <br />
      <span style={{ paddingLeft: "0.4rem" }}>{voteCount}</span>
      <br />
      <i
        id="downvote"
        className="bi bi-arrow-down-circle"
        onClick={handleDownVote}
      />
    </div>
  );
}
