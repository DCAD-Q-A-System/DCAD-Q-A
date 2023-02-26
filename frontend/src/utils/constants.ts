import axios from "axios";

import { WS } from "./paths";

import ReconnectingWebSocket from "reconnecting-websocket";
export const AXIOS_INSTANCE = axios.create();

export const LOCAL_STORAGE_LOGIN_KEY = "loginData";
console.log(window.location.host);
const URL = location.protocol !== "https:" ? "ws" : "wss";
export const socket = new ReconnectingWebSocket(
  `${URL}://localhost:8080/ws`,
  [],
  { connectionTimeout: 1000, maxRetries: 10 }
);
