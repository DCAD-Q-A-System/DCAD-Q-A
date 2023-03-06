import { InputLiveStreamSource } from "../components/InputLiveStreamSoure";
import { EndTime, StartTime } from "../control_panel/AddTimeSet";
import React, { useEffect, useState } from "react";
import { PANOPTO_REGEX, YOUTUBE_REGEX } from "../../utils/regex";
import "./MeetingDetails.css";
import { Button, Form, ListGroup } from "react-bootstrap";
import {
  CREATE_MEETING,
  EDIT_MEETING,
  GET_MEETING,
  GET_USER_SUGGESTIONS,
} from "../../utils/paths";
import { HTTP_METHODS } from "../../utils/http_methods";
import { useNavigate, useParams } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { debounce } from "lodash";
import { credentialFetch } from "../../utils/credential_fetch";
import { ISocketMember } from "../../utils/socket_types";
import moment from "moment";
import {
  DETAILS_TYPE,
  MeetingData,
  IMeetingDetails,
} from "../../utils/interfaces";

export function MeetingDetails({ detailsType }: { detailsType: DETAILS_TYPE }) {
  const { meetingId } = useParams();
  const [value, onChange] = useState(new Date());
  const [endvalue, endOnChange] = useState(new Date());
  const [iframeLink, setIframeLink] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [suggestions, setSuggestions] = useState<ISocketMember[]>([]);
  const [chosenMembers, setChosenMembers] = useState<ISocketMember[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (detailsType === DETAILS_TYPE.EDIT) {
      const getMeeting = async () => {
        const res = await credentialFetch(GET_MEETING + meetingId);
        if (res.status !== 200) {
          alert("something went wrong");
          return;
        }
        const data: IMeetingDetails = res.data;
        if (!data) {
          alert("server error");
          return;
        }
        console.log("meetin det", data);
        setMeetingName(data.name);
        setChosenMembers(data.members);
        setIframeLink(data.iframeLink);
        onChange(moment(data.startTime).toDate());
        endOnChange(moment(data.endTime).toDate());
      };
      getMeeting();
    }
  }, []);

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
      endValNum <= startValNum ||
      chosenMembers.length == 0
    ) {
      alert("Something went wront check form again");
      return;
    }
    const users = chosenMembers.some(user=>user.username === 'admin')
      if(!users){
        const res = await credentialFetch(GET_USER_SUGGESTIONS + 'admi');
        const data: ISocketMember[] = res.data; 
        const admin = data.find(obj=>obj.username==='admin');
        if(admin){
          const chosenMembersSet = new Set(chosenMembers);
          chosenMembersSet.add(admin);
          setChosenMembers(()=>[...chosenMembersSet])
          alert('Admin is allowed to join the meeting!')
          return
        }
    }

    console.log(detailsType);
    if (detailsType === DETAILS_TYPE.CREATE) {
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
    } else if (detailsType === DETAILS_TYPE.EDIT && meetingId) {
      const res = await fetch(EDIT_MEETING, {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify({
          id: meetingId,
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
      <div className=" color-overlay d-flex justify-content-center align-items-center">
        <Form className="outside p-4 p-sm-3 ">
          <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
            <Form.Label className="fs-4">Meeting Name: </Form.Label>
            <Form.Control
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              placeholder="Enter meeting name"
              // className="length fs-4"
              style={{ width: "90%" }}
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label className="fs-4">Start Time:</Form.Label>
            <StartTime value={value} onChange={onChange} />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label className="fs-4">End Time:</Form.Label>
            <EndTime
              value={value}
              endvalue={endvalue}
              endOnChange={endOnChange}
            />
          </Form.Group>

          <Form.Label className="fs-4">Participants:</Form.Label>
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
          <Form.Label className="fs-4 mt-5">Iframe Link:</Form.Label>
          <InputLiveStreamSource
            iframeLink={iframeLink}
            setIframeLink={setIframeLink}
          />

          <Button
            variant="primary"
            type="submit"
            onClick={submitForm}
            className="button mt-5 fs-3"
          >
            save
          </Button>
          <Button
            variant="secondary"
            type="button"
            style={{
              marginLeft: "20px",
              paddingLeft: "10px",
            }}
            onClick={() => navigate("/meeting-list")}
            className="button mt-5 fs-3"
          >
            return
          </Button>
        </Form>
      </div>
    </>
  );
}
