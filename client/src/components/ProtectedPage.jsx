import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Space, Tabs } from "antd";
import React, { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
const { Search } = Input;

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.role === "jobProvider") {
          // Redirect to the job provider dashboard
          navigate("/jobprovider-home");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetLoader(false));
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
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<BiUser size={18} />}>
        My profile
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<MdOutlineLogout size={18} />}
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Menu.Item>
      <Menu.Item key="3" icon={<IoIosHeartEmpty size={18} />}>
        My Jobs
      </Menu.Item>
    </Menu>
  );

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center pl-[2rem] pr-[2rem]">
          <div className="logo-div">
            <Link to="/jobseeker-home" className="no-underline">
              <h1 className="logo text-[27px] text-primary">JobSewa</h1>
            </Link>
          </div>

          {/* Ant Design Dropdown for user information */}
          <Space.Compact
            style={{
              width: "60%",
            }}
          >
            <Input defaultValue="Combine input and button" />
            <Button type="primary">Search</Button>
          </Space.Compact>

          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="relative z-10 cursor-pointer bg-gray-200 rounded flex items-center gap-1">
              <BiUser size={28} />
              <RiArrowDropDownLine size={28} />
            </div>
          </Dropdown>
        </div>

        {/* navigation */}
        {user.role === "jobSeeker" && (
          <div className="navigation pl-[2rem] pr-[2rem] flex justify-between">
            <Tabs
            type="card"
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Job Seeker Tab 1",
                  icon: <AppleOutlined />,
                },
                {
                  key: "2",
                  label: "Job Seeker Tab 2",
                  icon: <AndroidOutlined />,
                }
              ]}
            />
            <Tabs
              defaultActiveKey="1"
              items={[
                { key: "1", label: "Post a Job", icon: <AppleOutlined /> },
              ]}
            />
          </div>
        )}

        {user.role === "jobProvider" && (
          <div className="navigation pl-[2rem] pr-[2rem]">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Job Provider Tab 1",
                  icon: <AppleOutlined />,
                },
                {
                  key: "2",
                  label: "Job Provider Tab 2",
                  icon: <AndroidOutlined />,
                },
              ]}
            />
          </div>
        )}

        {/* body */}
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
