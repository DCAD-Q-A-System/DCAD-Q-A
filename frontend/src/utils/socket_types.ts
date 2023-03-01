import { IChat, MessageStructure, Reply } from "./interfaces";

export enum SOCKET_ERRORS_TYPE {
  INVALID_REQ_TYPE = "INVALID_REQ_TYPE",
  MEETING_ID_EMPTY = "MEETING_ID_EMPTY",
}

export enum SOCKET_COMMAND_TYPE {
  MAKE_USER_LEAVE = "MAKE_USER_LEAVE",
}

export interface ISocketMember {
  userId: string;
  username: string;
}

export interface ISocketMessageReceive {
  userId?: string;
  error: SOCKET_ERRORS_TYPE;
  message?: {
    meetingId: string;
    chat: IChat[];
    questions: MessageStructure[];
    newOnlineMembers: ISocketMember[];
    membersWhoLeft: ISocketMember[];
  };
  command?: SOCKET_COMMAND_TYPE;
}

export interface ISocketMessageSend {
  reqType: REQ_TYPES;
  content: string;
  meetingId: string;
  userId: string;
  username: string;
  userIdToSendCommand?: string;
}

export enum REQ_TYPES {
  INSERT_CHAT = "INSERT_CHAT",
  INSERT_QUESTION = "INSERT_QUESTION",
  INSERT_REPLY = "INSERT_REPLY",
  GET_ALL_USERS = "GET_ALL_USERS",
  PING = "PING",
}
