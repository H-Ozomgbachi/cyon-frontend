import axios, { AxiosError, AxiosResponse } from "axios";
import { customHistory } from "../..";
import { backendUrl } from "../../urls";
import { store } from "./appStore";
import { ROUTES } from "../../routes";

interface Error {
  data: any;
  status: number;
}

export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const processBadRequestMessage = (err: Error) => {
  if (err.data.message) {
    return err.data.message;
  } else if (
    err.data.errors &&
    err.data.title.includes("One or more validation errors occurred.")
  ) {
    const validationErrors = Object.values(err.data.errors).flatMap(
      (e) => e
    ) as string[];
    return validationErrors.join(", ");
  }
  console.log(err);
  return "An undescribed error occurred";
};

axios.defaults.baseURL = backendUrl;

axios.interceptors.request.use((request) => {
  const token = store.commonStore.token;
  if (token) request.headers.Authorization = `Bearer ${token}`;

  return request;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },

  (error: AxiosError) => {
    // if (error.message === "Network Error") {
    // }

    const resError = error.response as Error;
    switch (resError.status) {
      case 500:
        store.commonStore.setAlertText(
          "An internal server error occurred",
          true
        );
        break;
      case 401:
        store.commonStore.setLastVisitedPathname(window.location.pathname);
        customHistory.push(ROUTES.login);
        break;
      case 404:
        store.commonStore.setAlertText(resError.data.message, true);
        break;
      case 400:
        store.commonStore.setAlertText(
          processBadRequestMessage(resError),
          true
        );
        break;
      default:
        store.commonStore.setAlertText(
          "An unknown error occurred contact site admin",
          true
        );
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body?: {}) =>
    axios.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body?: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export default requests;
