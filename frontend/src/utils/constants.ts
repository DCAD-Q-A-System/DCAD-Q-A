import axios from "axios";

export const AXIOS_INSTANCE = axios.create();

export const LOCAL_STORAGE_LOGIN_KEY = "loginData";

export const WS = `ws://${window.location.hostname}/ws`;
// export const WS = `ws://localhost:8080/ws`;
export const HIGH_PRIVELAGE = ["PANELLIST", "ADMIN"];
