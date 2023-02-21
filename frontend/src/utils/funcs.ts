import { credentialFetch } from "./credential_fetch";
import { LoginResponse } from "./interfaces";
import { REFRESH_PATH } from "./paths";

export const checkIfInitiallyLoggedIn = async () => {
  const res = await credentialFetch(REFRESH_PATH);

  if (res.status === 200) {
    const rj: LoginResponse = res.data;
    return rj;
  } else {
    return null;
  }
};
