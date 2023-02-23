import axios from "axios";

import { WS } from "./paths";

export const AXIOS_INSTANCE = axios.create();

export const LOCAL_STORAGE_LOGIN_KEY = "loginData";

export const socket = new WebSocket("ws://localhost:8080/api/ws");
