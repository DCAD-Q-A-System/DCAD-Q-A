import { InputLiveStreamSource } from "../components/InputLiveStreamSoure";
import { EndTime, StartTime } from "../control_panel/AddTimeSet";
import React, { useState } from "react";
import { PANOPTO_REGEX, YOUTUBE_REGEX } from "../../utils/regex";
import "./CreateMeeting.css";
import meeting from "../../image/Meeting.jpg";
import { Button, Form, ListGroup } from "react-bootstrap";
import { CREATE_MEETING, GET_USER_SUGGESTIONS } from "../../utils/paths";
import { HTTP_METHODS } from "../../utils/http_methods";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { debounce } from "lodash";
import { credentialFetch } from "../../utils/credential_fetch";
import { ISocketMember } from "../../utils/socket_types";
import moment from "moment";

export function CreateMeeting() {
  const [value, onChange] = useState(new Date());
  const [endvalue, endOnChange] = useState(new Date());
  const [iframeLink, setIframeLink] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [suggestions, setSuggestions] = useState<ISocketMember[]>([]);
  const [chosenMembers, setChosenMembers] = useState<ISocketMember[]>([]);
  const navigate = useNavigate();

  const submitForm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const startValNum = moment(value).valueOf();
    const endValNum = moment(endvalue).valueOf();
    const timeNowNum = moment(new Date()).valueOf();
    if (
      !(iframeLink.match(YOUTUBE_REGEX) || iframeLink.match(PANOPTO_REGEX)) ||
      meetingName === "" ||
      startValNum <= timeNowNum ||
      endvalue <= startValNum
    ) {
      alert("Something went wront check form again");
      return;
    }
    const res = await fetch(CREATE_MEETING, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify({
        name: meetingName,
        iframeLink,
        members: chosenMembers.map((x) => x.userId),
        startTime: value,
        endTime: endvalue,
      }),
    });
    if (res.status == 200) {
      alert("Successful!");
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const handleChange = debounce(async (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const res = await credentialFetch(GET_USER_SUGGESTIONS + value);
    const data: ISocketMember[] = res.data;
    setSuggestions(data);
  }, 500);

  return (
    <>
      <div
        className="div"
        style={{
          backgroundImage: `url(${meeting})`,
        }}
      >
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <Form className="form p-4 p-sm-3 ">
            <Form.Group className="mb-5 mt-4" controlId="formBasicEmail">
              <Form.Label className="title">Meeting Name: </Form.Label>
              <Form.Control
                type="text"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                placeholder="Enter meeting name"
                className="length fs-4"
                style={{ width: "90%" }}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label className="title">Start Time:</Form.Label>
              <StartTime value={value} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label className="title">End Time:</Form.Label>
              <EndTime
                value={value}
                endvalue={endvalue}
                endOnChange={endOnChange}
              />
            </Form.Group>

            {chosenMembers.length > 0 &&
              chosenMembers.map((m, i) => (
                <div key={i} className="chip">
                  {m.username}
                  <span
                    className="closebtn"
                    onClick={() => {
                      const newChosenMembers: ISocketMember[] = JSON.parse(
                        JSON.stringify(chosenMembers)
                      );
                      newChosenMembers.splice(i, 1);
                      setChosenMembers(newChosenMembers);
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))}
            <Form.Control
              type="search"
              value={memberName}
              onChange={(e) => {
                handleChange(e.target.value);
                setMemberName(e.target.value);
              }}
              placeholder="Enter member name"
              className="length fs-4"
              style={{ width: "90%" }}
            />
            {suggestions.length > 0 && (
              <ListGroup>
                {suggestions.map((el, i) => (
                  <ListGroup.Item
                    key={i}
                    onClick={() => {
                      const chosenMembersSet = new Set(chosenMembers);
                      chosenMembersSet.add(el);
                      setChosenMembers([...chosenMembersSet]);
                    }}
                  >
                    {el.username}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            <InputLiveStreamSource
              iframeLink={iframeLink}
              setIframeLink={setIframeLink}
            />

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "50px", fontSize: "20px" }}
              onClick={submitForm}
              className="button"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              style={{
                marginLeft: "20px",
                marginTop: "50px",
                fontSize: "20px",
              }}
              onClick={() => navigate("/")}
              className="button"
            >
              Return
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
