import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserApi } from "../redux/userMovie/userMovie";
export default function UserDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infoUser = async () => {
    // console.log("value");
    const action = getInfoUserApi();
    await dispatch(action);
    navigate("/infouser");
  };
  const { userReducer } = useSelector(
    (state) => state.persistedReducer.userMovie
  );
  const renderLogin = () => {
    if (userReducer.accessToken) {
      return (
        <div className="header-btn">
          <Button
            onClick={() => {
              infoUser();
            }}
          >
            Tài Khoản
          </Button>
        </div>
      );
    }
    return (
      <NavLink className="nav-link login-return" to="/login">
        <Button type="primary">Đăng Nhập</Button>
      </NavLink>
    );
  };
  return (
    <div className="header-home">
      <div className="header">
        <div className="signin">
          <div className="signinbutton">{renderLogin()}</div>
        </div>
      </div>
    </div>
  );
}
