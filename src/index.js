import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
// Sentry.init({

//   dsn: "https://202ac8ecce934b7eb0150a70726233f3@o1082112.ingest.sentry.io/6090162",
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
