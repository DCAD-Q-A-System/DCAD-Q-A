import { USER_TYPE } from "./enums";

export interface LoginResponse {
  username: string;
  type: USER_TYPE;
}

export interface MeetingIds {
  ids: { id: string; name: string; startTime: string; endTime: string }[];
}
