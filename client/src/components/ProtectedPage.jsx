import { Avatar, Badge, Dropdown, Menu, message } from "antd";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CiChat1, CiFileOn } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { RiNotificationLine } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../apicalls/notifications";
import { GetCurrentUser } from "../apicalls/users";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";

function ProtectedPage({ children }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotification, setShowNotifications] = useState(false);
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
        } else if (response.data.role === "jobSeeker") {
          navigate("/jobseeker-home");
        } else if (response.data.role === "admin") {
          navigate("/admin-home");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
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
      {user && user.role === "jobSeeker" && (
        <>
          <Menu.Item
            key="1"
            icon={<BiUser size={18} />}
            onClick={() => navigate("/profile")}
          >
            My profile
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<IoIosHeartEmpty size={18} />}
            onClick={() => navigate("/my-jobs")}
          >
            My Jobs
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<CiFileOn size={18} />}
            onClick={() => navigate("/resume")}
          >
            Resume
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<TbFileDescription size={18} />}
            onClick={() => navigate("/resume-description")}
          >
            Resume Description
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<CiChat1 size={18}/>}
            onClick={() => navigate("/chat")}
          >
            Messages
          </Menu.Item>
        </>
      )}
      {user && user.role === "jobProvider" && (
        <>
          <Menu.Item
            key="1"
            icon={<BiUser size={18} />}
            onClick={() => navigate("/profile")}
          >
            My Profile
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<IoIosHeartEmpty size={18} />}
            onClick={() => navigate("/jobprovider-home")}
          >
            My Jobs
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<CiChat1 size={18}/>}
            onClick={() => navigate("/chat")}
          >
            Messages
          </Menu.Item>
        </>
      )}
      {user && user.role === "admin" && (
        <>
          <Menu.Item
            key="1"
            icon={<BiUser size={18} />}
            onClick={() => navigate("/profile")}
          >
            My Profile
          </Menu.Item>
        </>
      )}
      <Menu.Item
        key="6"
        icon={<MdOutlineLogout size={18} />}
        onClick={handleLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center pl-[2rem] pr-[2rem] bg-primary ">
          <div className="logo-div">
            <h1
              className="logo text-[27px] cursor-pointer text-white"
              onClick={() => {
                if (user.role === "jobProvider") {
                  navigate("/jobprovider-home");
                } else if (user.role === "jobSeeker") {
                  navigate("/jobseeker-home");
                } else {
                  navigate("/admin-home");
                }
              }}
            >
              JobSewa
            </h1>
          </div>

          <div className="relative z-10 cursor-pointer rounded flex items-center gap-3 ">
            <span className="text-white" onClick={() => navigate("/profile")}>
              {user.name}
            </span>
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
            >
              <Avatar
                size="large"
                shape="square"
                icon={<RiNotificationLine />}
              />
            </Badge>
            <Dropdown overlay={menu} trigger={["click"]}>
              <BiUser size={26} color="white" />
            </Dropdown>
          </div>
        </div>

        {/* body */}
        <div className="p-5">{children}</div>

        {
          <Notifications
            notifications={notifications}
            reloadNotifications={setNotifications}
            showNotification={showNotification}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
}

export default ProtectedPage;
