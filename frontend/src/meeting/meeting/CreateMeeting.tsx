import { InputLiveStreamSource } from "../components/InputLiveStreamSoure";
import { EndTime, StartTime } from "../control_panel/AddTimeSet";
import React, { useState } from "react";
import { PANOPTO_REGEX, YOUTUBE_REGEX } from "../../utils/regex";
import "./CreateMeeting.css";
import meeting from "../../image/Meeting.jpg";
import { Button, Form } from "react-bootstrap";
import { CREATE_MEETING } from "../../utils/paths";
import { HTTP_METHODS } from "../../utils/http_methods";

export function CreateMeeting() {
  const [value, onChange] = useState(new Date());
  const [endvalue, endOnChange] = useState(new Date());
  const [iframeLink, setIframeLink] = useState("");
  const [meetingName,setMeetingName] = useState("")

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!(iframeLink.match(YOUTUBE_REGEX) || iframeLink.match(PANOPTO_REGEX))) {
      alert("Wrong embed!");
      return;
    }
    const res = await fetch(CREATE_MEETING, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({ name:meetingName,iframeLink,startTime:value,endTime:endvalue }),
    });
    if (res.status == 200) {
      alert("Successful!");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div
        className="div"
        style={{
          backgroundImage: `url(${meeting})`,
        }}
      >
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Meeting Name: </Form.Label>
                <Form.Control
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                  placeholder="Enter meeting name"
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Start Time:</Form.Label>
                  <StartTime value={value} onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>End Time:</Form.Label>
                  <EndTime
                    value={value}
                    endvalue={endvalue}
                    endOnChange={endOnChange}
                  />
                </Form.Group>
                <InputLiveStreamSource
                  iframeLink={iframeLink}
                  setIframeLink={setIframeLink}
                />

                <Button variant="primary" type="submit">
                  Save
                </Button>
              
              </Form>
      </div>
      </div>
    </>
  );
}
