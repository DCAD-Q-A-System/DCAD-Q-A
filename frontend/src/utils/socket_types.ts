import { IChat, Reply } from "./interfaces";

export enum SOCKET_ERRORS_TYPE {
  INVALID_REQ_TYPE = "INVALID_REQ_TYPE",
  INVALID_JWT = "INVALID_JWT",
  MEETING_ID_EMPTY = "MEETING_ID_EMPTY",
}

export interface ISocketMember {
  userId: string;
  username: string;
}

export interface ISocketMessageReceive {
  userId: string;
  error: SOCKET_ERRORS_TYPE;
  message: {
    meetingId: string;
    chats: IChat[];
    questions: MessageStructure[];
    newOnlineMembers: ISocketMember[];
    membersWhoLeft: ISocketMember[];
  };
}

export interface ISocketMessageSend {
  reqType: REQ_TYPES;
  content: string;
  meetingId: string;
  userId: string;
  username: string;
}

export enum REQ_TYPES {
  INSERT_CHAT = "INSERT_CHAT",
  INSERT_QUESTION = "INSERT_QUESTION",
  INSERT_REPLY = "INSERT_REPLY",
}
