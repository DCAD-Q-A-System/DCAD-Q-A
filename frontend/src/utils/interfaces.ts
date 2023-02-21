import { USER_TYPE } from "./enums";

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

export interface Chat extends MessageStructure {
  replies: Reply[];
}

export interface Reply extends MessageStructure {
  parentChatId: string;
}
export interface MeetingData {
  id: string;
  name: string;
  messages: { questions: MessageStructure[]; chat: Chat[] };
  iframeLink: string;
  startTime: number;
  endTime: number;
  onlineMembers: string[];
}
