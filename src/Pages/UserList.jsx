import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import Table from "ant-responsive-table";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
  Modal,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserApi,
  deleteUserApi,
  searchUserListApi,
  updateUserApi,
} from "../redux/userMovie/userMovie";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default function UserList() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.persistedReducer.userMovie);
  // useEffect(() => {
  //   getUserListApi();
  // }, []);
  const originData = [];
  userList.forEach((item, index) => {
    originData.push({
      key: index,
      taiKhoan: item.taiKhoan,
      matKhau: item.matKhau,
      email: item.email,
      soDT: item.soDT,
      maNhom: item.maNhom,
      maLoaiNguoiDung: item.maLoaiNguoiDung,
      hoTen: item.hoTen,
    });
  });

  const [data, setData] = useState(originData);
  const [count, setCount] = useState(2);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      // name: "",
      // age: "",
      // address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  //Ham xoa nguoi dung
  const handleDelete = async (key) => {
    const newData = originData.filter((item) => item.key === key);
    const user = newData[0].taiKhoan;
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1);
        // console.log(newData);
        const action = deleteUserApi(user);
        await dispatch(action);
        setData(newData);
        message.success("Xóa tài khoản thành công");
      } else {
      }
    } catch (error) {
      message.error(error.response.data.content);
    }
  };
  //Ham chinh sua tai khoan
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        // console.log(newData[index]);
        // console.log(item);
        const action = updateUserApi(newData[index]);
        await dispatch(action);
        message.success("Cập nhật tài khoản thành công");
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error(errInfo.response.data.content);
    }
  };
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      width: "15%",
      editable: true,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",

      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      // width: "15%",
      editable: true,
    },
    {
      title: "Mã nhóm",
      dataIndex: "maNhom",
      // width: "5%",
      editable: true,
    },
    {
      title: "Mã người dùng",
      dataIndex: "maLoaiNguoiDung",

      editable: true,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      // width: "15%",
      editable: true,
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "Edit",
      // with: "8%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button style={{ backgroundColor: "red", color: "white" }}>
                Cancel
              </Button>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => {
              edit(record);
            }}
          >
            <Button type="primary">Edit</Button>
          </Typography.Link>
        );
      },
    },
    {
      title: "Xóa ",
      dataIndex: "delete",
      // width: "8%",
      render: (_, record) =>
        originData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              type="link"
              htmlType="submit"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Ham them nguoi dung
  const onFinish = async (values) => {
    console.log(values);
    try {
      const action = addUserApi(values);
      await dispatch(action);
      setData([...data, values]);
      setCount(count + 1);
      message.success("Thêm người dùng thành công");
    } catch (error) {
      message.error(error.response.data.content);
    }
  };
  const { Search } = Input;
  const onSearch = async (value) => {
    try {
      const action = searchUserListApi(value);
      await dispatch(action);
      message.success("Thành công");
      window.location.reload();
    } catch (error) {
      message.error(error.response.data.content);
    }
  };
  return (
    <div className="userlist">
      <>
        <Button
          className="mb-4 me-3 d-block"
          type="primary"
          onClick={showModal}
        >
          Thêm người dùng
        </Button>
        <Search
          placeholder="Nhập mã nhóm"
          onSearch={onSearch}
          enterButton
          style={{ width: "20vh", marginBottom: "10px" }}
        />
        <Modal
          title="Thêm người dùng "
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <Form
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
                  message: "Vui lòng nhập tên tài khoản!",
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
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Email!",
                },
              ]}
            >
              <Input
                prefix={<i className="fa-regular fa-envelope"></i>}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="soDt"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <Input
                prefix={<i className="fa-solid fa-phone"></i>}
                type="number"
                placeholder="Số điện thoại"
              />
            </Form.Item>
            <Form.Item
              name="maNhom"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã nhóm!",
                },
              ]}
            >
              <Input
                prefix={<i className="fa-solid fa-users"></i>}
                // type="password"
                placeholder="GP+manhom"
              />
            </Form.Item>
            <Form.Item
              name="maLoaiNguoiDung"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã người dùng!",
                },
              ]}
            >
              <Input
                prefix={<i className="fa-solid fa-hammer"></i>}
                // type="password"
                placeholder="QuanTri hoặc KhachHang"
              />
            </Form.Item>
            <Form.Item
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên",
                },
              ]}
            >
              <Input
                prefix={<i className="fa-solid fa-signature"></i>}
                // type="password"
                placeholder="Họ Tên"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
      <Form form={form} component={false}>
        <Table
          size="small"
          title={null}
          scroll={{ x: 1000,y:500}}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
}
