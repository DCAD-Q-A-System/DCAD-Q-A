const PREFIX_API = "/api";

const JOIN_MEETING = PREFIX_API + "/join-meeting";

const WS = "/ws";

const LOGIN = PREFIX_API + "/login";

const LOGOUT = PREFIX_API + "/logout";

const STUDENT_LOGIN = LOGIN + "/student";

const ADMIN_LOGIN = PREFIX_API + LOGIN + "/admin";

const PANELLIST_LOGIN = PREFIX_API + LOGIN + "/panellist";

const GUEST_LOGIN = PREFIX_API + LOGIN + "/guest";

const GET_ALL_MESSAGES = PREFIX_API + "/get-all-messages";

const GET_ALL_USERS_IN_MEETING = PREFIX_API + "/get-all-users-in-meeting";

const GET_ALL_USERS = PREFIX_API + "/get-all-users";

const GET_USER = PREFIX_API + "/get-user?userId=";

const GET_MEETING = PREFIX_API + "/get-meeting?meetingId=";

const GET_USER_SUGGESTIONS = PREFIX_API + "/get-user-suggestions?username=";

const CREATE_MEETING = PREFIX_API + "/create-meeting";

const CREATE_USER = PREFIX_API + "/create-user";

const EDIT_MEETING = PREFIX_API + "/edit-meeting";

const EDIT_USER = PREFIX_API + "/edit-user";

const EDIT_USER_PASSWORD = PREFIX_API + "/edit-user-password";

const LEAVE_MEETING = PREFIX_API + "/leave-meeting";

const GET_ALL_MEETINGS = PREFIX_API + "/get-all-meetings";

const REFRESH_PATH = PREFIX_API + "/refresh";

const BAN_USER = PREFIX_API + "/ban-user";

const END_MEETING = PREFIX_API + "/end-meeting";

const DELETE_USER = PREFIX_API + "/delete-user";
export {
  JOIN_MEETING,
  LOGIN,
  WS,
  LOGOUT,
  STUDENT_LOGIN,
  ADMIN_LOGIN,
  PANELLIST_LOGIN,
  GET_ALL_MESSAGES,
  GET_ALL_MEETINGS,
  GET_ALL_USERS_IN_MEETING,
  GET_ALL_USERS,
  GET_USER,
  GET_MEETING,
  GET_USER_SUGGESTIONS,
  CREATE_USER,
  CREATE_MEETING,
  EDIT_MEETING,
  EDIT_USER,
  EDIT_USER_PASSWORD,
  LEAVE_MEETING,
  REFRESH_PATH,
  END_MEETING,
  BAN_USER,
  DELETE_USER,
};
