import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";

function ProtectedPage({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">My profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
    </Menu>
  );

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary">
          <h1>Helooooooooooo</h1>

          {/* Ant Design Dropdown for user information */}
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="cursor-pointer">
              <Avatar icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>

        {/* body */}
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
