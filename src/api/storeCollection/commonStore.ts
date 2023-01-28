import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { AlertColor } from "@mui/material";
import { makeAutoObservable, reaction } from "mobx";
import { customHistory } from "../..";

export class CommonStore {
  id: string | null = window.localStorage.getItem("id-cyon");
  token: string | null = window.localStorage.getItem("jwt-cyon");
  loading = false;
  isModalFullScreen = false;
  modalVisible = false;
  modalContent: ReactJSXElement | null = null;
  modalTitle: string = "";
  alertVisible = false;
  alertText = "";
  alertSeverity: AlertColor = "success";
  lastVisitedPathname: string | null = null;
  onreloadPath: string | null = window.localStorage.getItem("reload-path-cyon");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt-cyon", token);
        } else {
          window.localStorage.removeItem("jwt-cyon");
        }
      }
    );

    reaction(
      () => this.id,
      (id) => {
        if (id) {
          window.localStorage.setItem("id-cyon", id);
        } else {
          window.localStorage.removeItem("id-cyon");
        }
      }
    );

    reaction(
      () => this.onreloadPath,
      (onreloadPath) => {
        if (onreloadPath) {
          window.localStorage.setItem("reload-path-cyon", onreloadPath);
        } else {
          window.localStorage.removeItem("reload-path-cyon");
        }
      }
    );
  }

  setLoading = (value: boolean) => (this.loading = value);

  setModalVisible = (value: boolean) => (this.modalVisible = value);

  setModalContent = (
    content: ReactJSXElement,
    modalTitle: string,
    isFullScreen = false
  ) => {
    window.scrollTo(0, 0);
    this.modalVisible = true;
    this.modalContent = content;
    this.modalTitle = modalTitle;

    if (isFullScreen) {
      this.isModalFullScreen = true;
    }
  };

  setAlertVisible = (value: boolean) => (this.alertVisible = value);

  setAlertText = (value: string, isError = false) => {
    this.alertVisible = true;
    this.alertText = value;

    if (isError) {
      this.alertSeverity = "error";
    }
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setId = (id: string | null) => {
    this.id = id;
  };

  setOnreloadPath = (path: string | null) => {
    this.onreloadPath = path;
  };

  setLastVisitedPathname = (pathname: string | null) => {
    this.lastVisitedPathname = pathname;
  };

  redirectDecision = () => {
    let linkToDirect;

    if (this.lastVisitedPathname === "/" || this.onreloadPath === "/") {
      linkToDirect = "/dashboard";
    } else if (
      this.lastVisitedPathname !== null &&
      this.lastVisitedPathname !== "/account/login" &&
      this.lastVisitedPathname !== "/account/forgot-password"
    ) {
      linkToDirect = this.lastVisitedPathname;
    } else if (
      this.onreloadPath !== null &&
      this.onreloadPath !== "/account/login" &&
      this.onreloadPath !== "/account/forgot-password" &&
      !this.onreloadPath.includes("/account/reset-password") &&
      this.onreloadPath !== "/account/register"
    ) {
      linkToDirect = this.onreloadPath;
    } else {
      linkToDirect = "/account";
    }

    customHistory.push(linkToDirect);
  };

  goBack = () => customHistory.back();
}
