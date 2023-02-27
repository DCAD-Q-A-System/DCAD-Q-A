import React from "react";
import "./MeetingList.css";
import { useAppSelector } from "../../store/hooks";
import { GET_ALL_MEETINGS } from "../../utils/paths";
import { HTTP_METHODS } from "../../utils/http_methods";
import { useEffect, useState } from "react";
import { MeetingIds } from "../../utils/interfaces";
import { credentialFetch } from "../../utils/credential_fetch";
import { MeetingItem } from "../components/MeetingItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function MeetingList() {
  const [ids, setIds] = useState<MeetingIds | null>(null);
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();
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
      <div className="Container">
        <div className="box">
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
          <Button
            className="return"
            style={{ fontSize: "25px" }}
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Return
          </Button>
        </div>
      </div>
    </>
  );
}
