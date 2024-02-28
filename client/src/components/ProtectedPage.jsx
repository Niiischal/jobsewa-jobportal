import { Dropdown, Menu } from "antd";
import React, { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { CiFileOn } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";

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
      <Menu.Item key="1" icon={<BiUser size={18} />}
      onClick={()=> navigate("/profile")}>
        My profile
      </Menu.Item>
      <Menu.Item key="2" icon={<IoIosHeartEmpty size={18} />}
      onClick={()=> navigate("/my-jobs")}>
        My Jobs
      </Menu.Item>
      <Menu.Item key="3" icon={<CiFileOn size={18} />}
      onClick={()=> navigate("")}>
        Resume
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={<MdOutlineLogout size={18} />}
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    user && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center pl-[2rem] pr-[2rem] bg-primary">
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
            <span className="text-white" onClick={()=>
            navigate("/profile")}>{user.name}</span>
            <Dropdown overlay={menu} trigger={["click"]}>
              <BiUser size={26} color="white" />
            </Dropdown>
          </div>
        </div>

        {/* body */}
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
