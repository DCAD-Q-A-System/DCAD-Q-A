import axios from "axios";

export const AXIOS_INSTANCE = axios.create();

export const LOCAL_STORAGE_LOGIN_KEY = "loginData";
export const URL = location.protocol !== "https:" ? "ws" : "wss";

export const WS = `${URL}://localhost:8080/ws`;
export const HIGH_PRIVELAGE = ["PANELLIST", "ADMIN"];
