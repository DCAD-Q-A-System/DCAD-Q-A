import { USER_TYPE } from "./enums";
import { ISocketMember } from "./socket_types";

export interface LoginResponse {
  username: string;
  userId: string;
  type: USER_TYPE;
}

export interface MeetingIds {
  ids: { id: string; name: string; startTime: string; endTime: string }[];
}

export interface MessageStructure {
  id: string;
  content: string;
  timeCreated: string;
  userId: string;
  username: string;
}

export interface IChat extends MessageStructure {
  replies: Reply[];
}

export interface Reply extends MessageStructure {
  parentChatId: string;
}
export interface MeetingData {
  id: string;
  name: string;
  messages: IMsg;
  iframeLink: string;
  startTime: number;
  endTime: number;
  onlineMembers: ISocketMember[];
}

export interface IMsg {
  questions: MessageStructure[];
  chat: IChat[];
}

export enum USER_DETAILS_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT",
}
