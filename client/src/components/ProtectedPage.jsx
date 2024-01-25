import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  const menu = (
    <Menu>
      <Menu.Item key="1"
      icon={<BiUser size={18} />}>My profile</Menu.Item>
      <Menu.Item key="2"
      icon={<MdOutlineLogout size={18} />}
      onClick={() => {
        handleLogout();
      }}>Logout</Menu.Item>
    </Menu>
  );

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center pl-[2rem] pr-[2rem] border-solid  border-primary">
        <div className="logo-div">
          <Link to='/jobseeker-home' className="no-underline"><h1 className="logo text-[27px] text-primary">JobSewa</h1></Link>
        </div>

          {/* Ant Design Dropdown for user information */}
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="cursor-pointer">
            <Avatar icon={<UserOutlined style={{ color: 'black' }} />} />
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
