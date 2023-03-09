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

export interface IQuestion extends MessageStructure {
  answered: boolean;
  voteCount: number;
}

export interface IChat extends MessageStructure {
  replies: IReply[];
}

export interface IReply extends MessageStructure {
  parentChatId: string;
  parentMeetingId: string;
}
export interface MeetingData {
  id: string;
  name: string;
  messages: IMsg;
  iframeLink: string;
  startTime: number;
  endTime: number;
  onlineMembers: ISocketMember[];
  currentQuestionId: string;
}

export interface IMeetingDetails {
  id: string;
  name: string;
  iframeLink: string;
  startTime: string;
  endTime: string;
  members: ISocketMember[];
}

export interface IMsg {
  questions: IQuestion[];
  chat: IChat[];
}

export enum DETAILS_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT",
}
