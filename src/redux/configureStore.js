import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import post from "./modules/post";
import user from "./modules/user";
import sign from "./modules/sign";
import marker from "./modules/marker";
import dogsta from "./modules/dogsta";
import chat from "./modules/chat";
import comment from "./modules/comment";
import notification from "./modules/notification";
import modal from "./modules/modal";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  marker: marker,
  post: post,
  sign: sign,
  user: user,
  dogsta: dogsta,
  chat: chat,
  comment: comment,
  notification: notification,
  modal: modal,
  router: connectRouter(history),
 
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
