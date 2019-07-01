import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index.js";

const initialState = {};
const middleware = [thunk];
let store;
if (window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...(window.__REDUX_DEVTOOLS_EXTENSION__
        ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
        : [])
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./reducers/", () => {
      const newRootReducer = require("./reducers/").default;
      store.replaceReducer(newRootReducer);
    });
  }
}
export default store;
