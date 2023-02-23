import { credentialFetch } from "./credential_fetch";
import { LoginResponse } from "./interfaces";
import { REFRESH_PATH } from "./paths";

export const checkIfInitiallyLoggedIn = async () => {
  const res = await credentialFetch(REFRESH_PATH);

  if (res.status === 200) {
    const rj: LoginResponse = res.data;
    return rj;
  } else {
    console.log(res.status);
    return null;
  }
};

export var jsonToArray = function (json: any) {
  var str = JSON.stringify(json, null, 0);
  var ret = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
};

export function isOpen(ws: any) {
  return ws.readyState === ws.OPEN;
}
