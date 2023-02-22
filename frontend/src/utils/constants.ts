import axios from "axios";

import { io } from "socket.io-client";
import { WS } from "./paths";

export const AXIOS_INSTANCE = axios.create();

export const LOCAL_STORAGE_LOGIN_KEY = "loginData";

export const socket = io(WS);
