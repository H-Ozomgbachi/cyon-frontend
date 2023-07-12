import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { AlertColor } from "@mui/material";
import { makeAutoObservable, reaction } from "mobx";
import { customHistory } from "../..";

export class CommonStore {
  token: string | null = null;
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
  isAppLoaded = false;

  constructor() {
    makeAutoObservable(this);

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
    this.setIsModalFullScreen(isFullScreen);
  };
  setIsModalFullScreen = (value: boolean) => (this.isModalFullScreen = value);

  setAlertVisible = (value: boolean) => (this.alertVisible = value);

  setAlertText = (value: string, isError = false) => {
    this.alertVisible = true;
    this.alertText = value;

    if (isError) {
      this.alertSeverity = "error";
      window.scrollTo(0, 0);
    } else {
      this.alertSeverity = "success";
    }
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setOnreloadPath = (path: string | null) => {
    this.onreloadPath = path;
  };

  setLastVisitedPathname = (pathname: string | null) => {
    this.lastVisitedPathname = pathname;
  };

  redirectDecision = () => {
    let linkToDirect;

    if (
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

  unloadCallback = () => {
    window.localStorage.setItem("reload-path-cyon", window.location.pathname);
    if (this.token) {
      window.localStorage.setItem("jwt-cyon", this.token);
    }
  };

  handleCloseOrUnloadWindow = () => {
    window.addEventListener("unload", this.unloadCallback);
    window.addEventListener("close", this.unloadCallback);
    this.loadedCallback();
  };

  loadedCallback = () => {
    const retrievedToken = window.localStorage.getItem("jwt-cyon");

    if (retrievedToken) {
      this.setToken(retrievedToken);
      window.localStorage.removeItem("jwt-cyon");
    }
    this.redirectDecision();
  };
}
