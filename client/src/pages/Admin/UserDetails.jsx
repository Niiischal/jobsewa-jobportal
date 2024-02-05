import { Card, message, Pagination, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage] = useState(4); // Number of jobs per page
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


  useEffect(() => {
    getData();
  }, []);

  // Get current jobs
  const indexOfLastUser = currentPage * UsersPerPage;
  const indexOfFirstUser = indexOfLastUser - UsersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between mt-[10px]">
        {currentUsers.map((user) => (
          <Card
            className="border border-primary"
            key={user._id}
            title={user.name}
          >
            <p>
              Added On: {moment(user.createdAt).format("DD-MM-YYYY hh:mm A")}
            </p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Status: <StatusTag status={user.status} /></p>
          </Card>
        ))}
      </div>
      {users.length > 0 && (
        <Pagination
          className="mt-[10px] flex justify-end"
          current={currentPage}
          total={users.length}
          pageSize={UsersPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default UserDetails;
