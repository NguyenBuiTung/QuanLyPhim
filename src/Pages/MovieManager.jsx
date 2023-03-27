import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovieApi } from "../redux/productMovie/productMovie";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default function MovieManager() {
  const [form] = Form.useForm();
  const { movieList } = useSelector(
    (state) => state.persistedReducer.productMovie
  );
  const dispatch = useDispatch();
  const data = movieList.map((item, index) => {
    return {
      key: index,
      maPhim: item.maPhim,
      tenPhim: item.tenPhim,
      hinhAnh: <Image width={40} src={item.hinhAnh} />,
    };
  });
  const [dataSource, setDataSource] = useState(data);
  // const [count, setCount] = useState(2);
  const handleDelete = async (key) => {
    const newData = dataSource.filter((item) => item.key === key);
    const maPhim = newData[0].maPhim;
    try {
      const reloadData = [...dataSource];
      const index = reloadData.findIndex((item) => item.key === key);
      if (index > -1) {
        reloadData.splice(index, 1);
        const action = deleteMovieApi(maPhim);
        await dispatch(action);
        message.success("Xóa phim thành công");
        setDataSource(reloadData);
      }
    } catch (error) {
      message.error(error.response.data.content);
    }
  };
  const defaultColumns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      width: "30%",
      // editable:true
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      // editable: true,
    },
    {
      title: "Xóa phim",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          size="small"
          title={null}
          scroll={{ x: 400, y: 400 }}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </Form>
    </div>
  );
}
