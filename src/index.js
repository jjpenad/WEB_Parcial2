import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { IntlProvider } from "react-intl";
//import reportWebVitals from "./reportWebVitals";

import localEsMessages from "./locales/es.json";
import localEnMessages from "./locales/en.json";

const language = window.navigator.language || navigator.browserLanguage;

const lang = language.substring(0, 2);

console.log(lang);

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      locale={lang}
      messages={lang === "es" ? localEsMessages : localEnMessages}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
