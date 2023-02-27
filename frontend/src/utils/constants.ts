import axios from "axios";

import { WS } from "./paths";

import ReconnectingWebSocket from "reconnecting-websocket";
export const AXIOS_INSTANCE = axios.create();

export const LOCAL_STORAGE_LOGIN_KEY = "loginData";
export const URL = location.protocol !== "https:" ? "ws" : "wss";
