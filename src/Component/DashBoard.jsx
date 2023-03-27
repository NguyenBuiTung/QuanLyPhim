import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Select, theme } from "antd";
import Headerdash from "./Headerdash";
import { Outlet, useNavigate } from "react-router-dom";
import UserDash from "./UserDash";
import { getInfoUserApi, getUserListApi } from "../redux/userMovie/userMovie";
import { useDispatch } from "react-redux";
import {
  getDataMovieApi,
  searchDataMoviApi,
} from "../redux/productMovie/productMovie";
const { Header, Sider, Content, Footer } = Layout;
export default function DashBoard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserList = async () => {
    const action = getUserListApi();
    await dispatch(action);
    navigate("/userlist");
  };
  const handleChange = async (values) => {
    console.log(values.value);
    const action = searchDataMoviApi(values.value);
    await dispatch(action);
    navigate("/moviemanager");
    window.location.reload();
  };
  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: (
                  <UserOutlined
                    onClick={async () => {
                      const action = getInfoUserApi();
                      await dispatch(action);
                      navigate("/infouser");
                    }}
                  />
                ),
                label: <UserDash />,
              },
              {
                key: "2",
                icon: (
                  <UsergroupAddOutlined
                    onClick={() => {
                      getUserList();
                    }}
                  />
                ),
                label: (
                  <span
                    onClick={() => {
                      getUserList();
                    }}
                  >
                    {" "}
                    Danh sách người dùng
                  </span>
                ),
              },
              {
                key: "3",
                icon: (
                  <SettingOutlined
                    onClick={async () => {
                      const action = getDataMovieApi();
                      await dispatch(action);
                      navigate("/moviemanager");
                    }}
                  />
                ),
                label: (
                  <Select
                    labelInValue
                    defaultValue={{
                      label: "Danh sách phim",
                    }}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "GP01",
                        label: "Phim Hành Động",
                      },
                      {
                        value: "GP02",
                        label: "Phim Kinh Dị",
                      },
                      {
                        value: "GP03",
                        label: "Phim Tình Củm",
                      },
                      {
                        value: "GP04",
                        label: "Phim Ngôn Lù",
                      },
                      {
                        value: "GP05",
                        label: "Phim Hàn Xẻng",
                      },
                      {
                        value: "GP06",
                        label: "Phim Ma",
                      },
                      {
                        value: "GP07",
                        label: "Phim Viễn Tưởng",
                      },
                      {
                        value: "GP08",
                        label: "Phim Kiếm Hiệp",
                      },
                      {
                        value: "GP09",
                        label: "Phim Kinh Dị",
                      },
                      {
                        value: "GP10",
                        label: "Phim Nhật ",
                      },
                      {
                        value: "GP11",
                        label: "Phim Hành Động Nhật",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Headerdash />
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100vh",
              // width:'100vh',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Nguyễn Bùi Tùng ©2023 Created by BotaVN
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
