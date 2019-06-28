import React from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/authActions";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./css/App.css";
import MainPage from "./Dashboard/MainPage";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Footer from "./components/layout/Footer";

// Check for token
if (localStorage.jwtTokenHoursTracker) {
  setAuthToken(localStorage.jwtTokenHoursTracker);
  const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
  store.dispatch(setCurrentUser(decoded));
}
//
//   // Check for expired token
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     const { hoursToday, dateToday } = store.getState().timer;
//
//     if (hoursToday > 0) {
//       store.dispatch(logHours(hoursToday, dateToday));
//     }
//     store.dispatch(logoutUser());
//     window.location.href = "/login";
//   }
// }
const App = () => (
  <Provider store={store}>
    <div className="App">
      <div className="app-content">
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={MainPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Provider>
);

export default App;
