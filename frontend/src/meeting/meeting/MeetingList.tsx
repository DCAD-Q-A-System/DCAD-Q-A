import React from "react";
import "./MeetingList.css";
import { useAppSelector } from "../../store/hooks";
import { GET_ALL_MEETINGS } from "../../utils/paths";
import { HTTP_METHODS } from "../../utils/http_methods";
import { useEffect, useState } from "react";
import { MeetingIds } from "../../utils/interfaces";
import { credentialFetch } from "../../utils/credential_fetch";
import { MeetingItem } from "../components/MeetingItem";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../users/Menu";
import { VARIANT } from "../../utils/enums";
import { toastHook } from "../../utils/toastHook";

export function MeetingList() {
  const [ids, setIds] = useState<MeetingIds | null>(null);
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const [isOpen, setIsOpen] = useState(true);
  const { setToast } = toastHook();

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
        setToast(
          "Fetching error",
          "something went wrong fetching meetings",
          VARIANT.DANGER,
          true
        );
      }
    };
    fetchMeetings();
  }, []);
  console.log(ids);
  return (
    <>
      <div
        className="container"
        onClick={() => {
          isOpen == false ? setIsOpen(!isOpen) : "";
        }}
      >
        <Menu path="/" isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="box0">
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
            <Stack className="error">
              <p>No meetings assigned</p>
            </Stack>
          ) : (
            <Stack className="error">
              <p>Can't fetch meetings at the moment</p>
              <p>Try again later</p>
            </Stack>
          )}
        </div>
      </div>
    </>
  );
}
