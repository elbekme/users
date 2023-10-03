import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  changeActivePage,
  controlModal,
  getUsers,
} from "../../../redux/actions/userActions";

import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { ENDPOINT } from "../../../constants";

const UsersPage = () => {
  const columns = [
    {
      title: "Firstname",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Lastname",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      // render: (photo) => {
      //   return (
      //     <Image
      //       height={50}
      //       src={`${ENDPOINT}upload/${photo?._id}.${photo?.name.split(".")[1]}`}
      //     />
      //   );
      // },
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary">Edit</Button>
            <Button danger type="primary">
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  const {
    users,
    total,
    loading,
    activePage,
    selected,
    isModalOpen,
    btnLoading,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Fragment>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Categories ({users.length})</h1>
            <Button type="primary" onClick={() => dispatch(controlModal())}>
              Add
            </Button>
          </div>
        )}
        pagination={false}
        columns={columns}
        dataSource={users}
      />
      <Pagination
        current={activePage}
        total={total}
        onChange={(page) => dispatch(changeActivePage(page))}
      />
      <Modal
        title="User data"
        open={isModalOpen}
        onOk={() => dispatch(addUser(form))}
        confirmLoading={btnLoading}
        onCancel={() => dispatch(controlModal())}
        okText={selected === null ? "Add user" : "Save user"}
      >
        <Form
          form={form}
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
