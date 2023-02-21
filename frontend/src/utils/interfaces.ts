import { USER_TYPE } from "./enums";

export interface LoginResponse {
  username: string;
  userId: string;
  type: USER_TYPE;
}

export interface MeetingIds {
  ids: { id: string; name: string; startTime: string; endTime: string }[];
}

interface MessageStructure {
  id: string;
  content: string;
  timeCreated: string;
}

interface Chat extends MessageStructure {
  replies: Reply[];
}

interface Reply extends MessageStructure {
  parentChatId: string;
}
export interface MeetingData {
  id: string;
  chats: Chat[];
  questions: MessageStructure[];
}
