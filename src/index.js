import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { store } from "./redux/configStores";
import DashBoard from "./Component/DashBoard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import InfoUser from "./Pages/InfoUser";
import UserList from "./Pages/UserList";
import Home from "./Pages/Home";
import MovieManager from "./Pages/MovieManager";
import { PrivateRouter } from "./Component/PrivateRouter";
export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<DashBoard />}>
          <Route path="/home" index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/infouser" element={<InfoUser />}></Route>
            <Route path="/userlist" element={<UserList />}></Route>
            <Route path="/moviemanager" element={<MovieManager />}></Route>
          </Route>
          <Route path="/infouser" element={<InfoUser />}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
          <Route path="/moviemanager" element={<MovieManager />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
