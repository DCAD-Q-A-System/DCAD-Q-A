import { AxiosRequestConfig } from "axios";
import { HTTP_METHODS } from "./enum";
import { AXIOS_INSTANCE } from "./utils";

export const credentialFetch = async (
  url: string,
  method: string = HTTP_METHODS.GET,
  body: string | FormData = ""
) => {
  let options: AxiosRequestConfig = {
    url,
    method,
    withCredentials: true,
  };
  switch (method) {
    case HTTP_METHODS.GET:
    case HTTP_METHODS.HEAD:
      delete options.data;
      break;
    default:
      options.data = body;
      break;
  }

  return await AXIOS_INSTANCE.request(options);
};
