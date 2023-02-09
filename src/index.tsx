import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { theme } from "./globalTheme";
import { ThemeProvider } from "@mui/material/styles";
import { store, StoreContext } from "./api/main/appStore";

export const customHistory = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter history={customHistory}>
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreContext.Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
