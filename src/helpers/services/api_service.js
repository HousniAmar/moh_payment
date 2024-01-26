import Axios from "axios";

import {
  API_URL,
  API_TOKEN,
  LOCAL_API_URL,
  PAYZEN_API,
} from "../constants/api";
// import { alertService } from "./alertService";
const UNAUTHORIZED_MESSAGE = "Unauthorized";
const TOKEN_IS_REQUIRED = "A token is required";
const TOKEN_IS_BLACKLISTED = "The token has been blacklisted";
// const TOKEN_NOT_FOND = "JWT Token not found";
const INVALID_TOKEN = "Invalid JWT Token";
const EXPIRED_REFRESH_TOKEN = "An authentication exception occurred.";
// const JWT_REFRESH_TOKEN_NOT_FOUND = "JWT Refresh Token Not Found";
const HTTP_UNAUTHORIZED = 401;
var attempts = 0;
export const instance = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers["X-Api-Key"] = API_TOKEN;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const internal_instance = Axios.create({
  baseURL: LOCAL_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + window.localStorage.getItem("refreshToken") ?? "",
  },
});

internal_instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      let message = error.response.data.error; // message from server

      if (
        error.response.status == HTTP_UNAUTHORIZED &&
        (!localStorage.getItem("token") || TOKEN_IS_BLACKLISTED == message)
      ) {
        clearToken();
      }
      if (
        error.response.status == HTTP_UNAUTHORIZED &&
        attempts < 6 &&
        localStorage.getItem("token")
      ) {
        // localStorage.removeItem("token");
        // if (message === JWT_REFRESH_TOKEN_NOT_FOUND) {
        //   clearToken();
        // }
        if (
          message === UNAUTHORIZED_MESSAGE
          // ||
          // message === TOKEN_NOT_FOND ||
          // message === INVALID_TOKEN
        ) {
          try {
            attempts++;
            return await internal_instance
              .post("token/refresh")
              .then((response) => {
                if (response && response.data) {
                  attempts = 0;
                  localStorage.setItem("token", response.data.access_token);
                  localStorage.setItem(
                    "refreshToken",
                    response.data.access_token
                  );
                }
                return instance({
                  ...originalConfig,
                  headers: {
                    ...originalConfig.headers,
                    Authorization: "Bearer " + response.data.access_token,
                  },
                });
              })
              .catch((error) => {
                return Promise.reject(error);
              });
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        } else if (
          message === EXPIRED_REFRESH_TOKEN ||
          message === INVALID_TOKEN
        ) {
          if (attempts == 2) {
            clearToken();
          }
          attempts++;
          return Promise.reject(error);
        } else return Promise.reject(error);
      } else if (attempts >= 6) {
        clearToken();
      }
      if (message == TOKEN_IS_REQUIRED) {
        clearToken();
      }
    }
    return Promise.reject(error);
  }
);

export const payzen_instance = Axios.create({
  baseURL: PAYZEN_API,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    // "Accept": "application/json",
    // "Authorization": "Basic " + PAYZEN_TOKEN,
    Authorization:
      "Basic NDc4MDg5MDg6dGVzdHBhc3N3b3JkX2hQQzE4a0lyTXFucElFYWM5R2F0cEdkZ3JpNVZid2JDUnhJaERUZzRHS0FRTw==",
  },
});

const clearToken = () => {
  attempts = 0;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
//   alertService.error("La session a expiré, veuillez vous reconnecter");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};
