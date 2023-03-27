import React, { useEffect, useState } from "react";
import { Form, InputNumber, Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserApi } from "../redux/userMovie/userMovie";

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
export default function InfoUser() {
  const { infoUser } = useSelector((state) => state.persistedReducer.userMovie);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getInfoUserApi();
    dispatch(action);
  }, []);
  const originData = [
    {
      key: 0,
      taikhoan: infoUser.taiKhoan,
      matkhau: infoUser.matKhau,
      hoTen: infoUser.hoTen,
      email: infoUser.email,
      soDT: infoUser.soDT,
      maNhom: infoUser.maNhom,
      maLoaiNguoiDung: infoUser.maLoaiNguoiDung,
    },
  ];

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taikhoan",
      width: "12.5%",
      editable: true,
    },
    {
      title: "Mật Khẩu",
      dataIndex: "matkhau",
      width: "12.5%",
      editable: true,
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      width: "12.5%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "12.5%",
      editable: true,
    },
    {
      title: "Số điện thoại ",
      dataIndex: "soDT",
      width: "12.5%",
      editable: true,
    },
    {
      title: "Mã nhóm",
      dataIndex: "maNhom",
      width: "12.5%",
      editable: true,
    },
    {
      title: "Mã người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: "12.5%",
      editable: true,
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
        // editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form form={form} component={false}>
        <Table
         size="small"
         title={null}
         scroll={{x:400,y:500 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
        />
      </Form>
    </div>
  );
}
