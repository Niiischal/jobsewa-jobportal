import { Button, Card, Pagination, Popconfirm, Tag, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllUser, UpdateUserStatus } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8); // Number of users per page
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUser(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const StatusTag = ({ status }) => {
    let tagColor;

    switch (status) {
      case "active":
        tagColor = "success";
        break;
      case "blocked":
        tagColor = "error";
        break;
      default:
        tagColor = "default";
    }

    return <Tag color={tagColor}>{status.toUpperCase()}</Tag>;
  };

  const ActionButtons = ({ status, _id, onStatusUpdate }) => {
    return (
      <div className="flex gap-3 justify-center">
        {status === "active" && (
          <Popconfirm
            title="Are you sure to block this User?"
            onConfirm={() => onStatusUpdate(_id, "blocked")}
            okText="Yes"
            cancelText="No"
            okType="default"
          >
            <Button danger>Block</Button>
          </Popconfirm>
        )}
        {status === "blocked" && (
          <Button onClick={() => onStatusUpdate(_id, "active")}>Unblock</Button>
        )}
      </div>
    );
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentUsers.map((user) => (
          <Card
            className="bg-[#fafafa] cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
            key={user._id}
            title={user.name}
          >
            <p>Added On: {moment(user.createdAt).format("DD-MM-YYYY hh:mm A")}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Status: <StatusTag status={user.status} /></p>
            <ActionButtons
              status={user.status}
              _id={user._id}
              onStatusUpdate={onStatusUpdate}
            />
          </Card>
        ))}
      </div>
      {users.length > 0 && (
        <Pagination
          className="mt-4 flex justify-end"
          current={currentPage}
          total={users.length}
          pageSize={usersPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default UserDetails;
