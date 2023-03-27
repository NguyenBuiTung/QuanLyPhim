import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { getUserLoginApi } from "../redux/userMovie/userMovie";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const action = getUserLoginApi(values);
      await dispatch(action);
      message.success("Đăng nhập thành công");
      navigate("/home");
    } catch (error) {
      // console.log(error);
      message.error(error.response.data.content);
    }
  };
  return (
    <div>
      <Form style={{width:'30vh'}}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lưu </Checkbox>
          </Form.Item>

         
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          Or <NavLink to={"/register"}>Đăng kí ngay</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
}
