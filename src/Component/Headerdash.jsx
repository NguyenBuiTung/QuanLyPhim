import React from "react";
import { NavLink } from "react-router-dom";
import { persistor } from "../redux/configStores";
import { ACCESSTOKEN, settings } from "../util/config";
import { Select, Button, Space } from "antd";
import { useSelector } from "react-redux";
// import { UserOutlined } from "@ant-design/icons";
export default function Headerdash() {
  const handleChange = (value) => {
    persistor.pause();
    persistor.flush().then(() => {
      // localStorage.removeItem(ACCESSTOKEN);
      settings.delete_cookie("accessToken");
      window.location.href = "/login";
      return persistor.purge();
    });
  };
  const { userReducer } = useSelector(
    (state) => state.persistedReducer.userMovie
  );
  const renderLogin = () => {
    if (settings.getCookie(ACCESSTOKEN)) {
      return (
        <div className="header-btn">
          <span className="manguoidung">{userReducer.maLoaiNguoiDung}</span>
          <Select
            
            defaultValue={{
              value: "",
              label: (
                <Space direction="vertical"  size={16}>
                 {userReducer.taiKhoan}
                </Space>
              ),
            }}
            style={{
              width: 140,
            }}
            onChange={handleChange}
            options={[
              {
                value: "logout",
                label: "Đăng xuất",
              },
            ]}
          />
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
        <div className="logo-header">
          <NavLink to="/home">
            {" "}
            <img
              src="https://bota.vn/wp-content/themes/bncgroup/images/logo_bota.png"
              alt=""
              width={60}
            />
          </NavLink>
        </div>
        <div className="signin">
          <div className="signinbutton">{renderLogin()}</div>
        </div>
      </div>
    </div>
  );
}
