export interface LoginResponse {
  username: string;
  type: USER_TYPE;
}

export interface MeetingIds {
  ids: { id: string }[];
}
