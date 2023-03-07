import React, { useState } from "react";
import "./Vote.css";
// import {ArrowUp} from 'bootstrap-UpIcons-react'
import "bootstrap-icons/font/bootstrap-icons.css";

export function Vote() {
  const [voteCount, setVoteCount] = useState(0);
  // const [upvoted, setUpvoted] = useState(false);
  // const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    const UpIcon = document.getElementById("upvote");
    const DownIcon = document.getElementById("downvote");
    if (UpIcon && DownIcon) {
      // if (!upvoted && !downvoted) {
      //   setVoteCount(voteCount + 1);
      //   setUpvoted(true);
      //   UpIcon.style.color = "blue";
      //   UpIcon.className = "bi bi-arrow-up-circle-fill";
      // } else if (downvoted) {
      //   setVoteCount(voteCount + 2);
      //   setUpvoted(true);
      //   setDownvoted(false);
      //   UpIcon.style.color = "blue";
      //   UpIcon.className = "bi bi-arrow-up-circle-fill";
      //   DownIcon.style.color = "black";
      //   DownIcon.className = "bi bi-arrow-down-circle";
      // } else if (upvoted) {
      //   setVoteCount(voteCount - 1);
      //   setUpvoted(false);
      //   UpIcon.style.color = "black";
      //   UpIcon.className = "bi bi-arrow-up-circle";
      // }
      setVoteCount((voteCount + 1) % 2);
    }
  };

  const handleDownvote = () => {
    const UpIcon = document.getElementById("upvote");
    const DownIcon = document.getElementById("downvote");
    if (DownIcon && UpIcon) {
      // if (!upvoted && !downvoted) {
      //   setVoteCount(voteCount - 1);
      //   setDownvoted(true);
      //   DownIcon.style.color = "red";
      //   DownIcon.className = "bi bi-arrow-down-circle-fill";
      // } else if (upvoted) {
      //   setVoteCount(voteCount - 2);
      //   setDownvoted(true);
      //   setUpvoted(false);
      //   DownIcon.style.color = "red";
      //   DownIcon.className = "bi bi-arrow-down-circle-fill";
      //   UpIcon.style.color = "black";
      //   UpIcon.className = "bi bi-arrow-up-circle";
      // } else if (downvoted) {
      //   setVoteCount(voteCount + 1);
      //   setDownvoted(false);
      //   DownIcon.className = "bi bi-arrow-down-circle";
      //   DownIcon.style.color = "black";
      // }
      setVoteCount((voteCount - 1) % -2);
    }
  };

  return (
    <div>
      <i id="upvote" className="bi bi-arrow-up-circle" onClick={handleUpvote} />
      <br />
      <span style={{ paddingLeft: "0.4rem" }}>{voteCount}</span>
      <br />
      <i
        id="downvote"
        className="bi bi-arrow-down-circle"
        onClick={handleDownvote}
      />
    </div>
  );
}
