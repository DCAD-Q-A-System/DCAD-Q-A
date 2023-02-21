const PREFIX_API = "/api";

const JOIN_MEETING = PREFIX_API + "/join-meeting";

const LOGIN = PREFIX_API + "/login";

const STUDENT_LOGIN = LOGIN + "/student";

const ADMIN_LOGIN = PREFIX_API + LOGIN + "/admin";

const PANELLIST_LOGIN = PREFIX_API + LOGIN + "/panellist";

const GUEST_LOGIN = PREFIX_API + LOGIN + "/guest";

const GET_ALL_MESSAGES = PREFIX_API + "/get-all-messages";

const CREATE_MEETING = PREFIX_API + "/create-meeting";

const EDIT_MEETING = PREFIX_API + "/edit-meeting";

const LEAVE_MEETING = PREFIX_API + "/leave-meeting";

const GET_ALL_MEETINGS = PREFIX_API + "/get-all-meetings";

const REFRESH_PATH = PREFIX_API + "/refresh";

export {
  JOIN_MEETING,
  LOGIN,
  STUDENT_LOGIN,
  ADMIN_LOGIN,
  PANELLIST_LOGIN,
  GET_ALL_MESSAGES,
  GET_ALL_MEETINGS,
  CREATE_MEETING,
  EDIT_MEETING,
  LEAVE_MEETING,
  REFRESH_PATH,
};
