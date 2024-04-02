import { Divider, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { CiFileOn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdPlaylistAddCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetJobs } from "../../apicalls/jobs";
import { GetAllUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";
import JobDetails from "./JobDetails";
import UserDetails from "./UserDetails";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalListings, settotalListings] = useState(0);
  const [approvedListings, setApprovedListings] = useState(0);
  const [pendingListings, setPendingListings] = useState(0);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs(null);
      dispatch(SetLoader(false));
      if (response.success) {
        settotalListings(response.data.length);
        const approvedListings = response.data.filter(
          (job) => job.status === "approved"
        );
        const approvedListingsCount = approvedListings.length;
        setApprovedListings(approvedListingsCount);
        const pendingListings = response.data.filter(
          (product) => product.status === "pending"
        );
        const pendingListingsCount = pendingListings.length;
        setPendingListings(pendingListingsCount);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const usersData = await GetAllUser();
      setTotalUsers(usersData.data.length);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
    getData();
    fetchTotalUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <div className="bg-[#FFF3E5] p-4 flex items-center justify-center flex-col rounded-md">
          <FaUsers size={48} className="text-white bg-[#FB8C00] rounded-full p-2" />
          <div className="text-center mt-2">
            <h1 className="text-xs font-medium text-zinc-500">TOTAL USERS</h1>
            <h1 className="text-xl font-bold ">{totalUsers}</h1>
          </div>
        </div>
        <div className="bg-[#EAEFFF] p-4 flex items-center justify-center flex-col rounded-md">
          <CiFileOn size={48} className="text-white bg-[#2962FF] rounded-full p-2" />
          <div className="text-center mt-2">
            <h1 className="text-xs font-medium text-zinc-500">TOTAL JOBS</h1>
            <h1 className="text-xl font-bold ">{totalListings}</h1>
          </div>
        </div>
        <div className="bg-[#EBF8ED] p-4 flex items-center justify-center flex-col rounded-md">
          <MdPlaylistAddCheck size={48} className="text-white bg-[#33B647] rounded-full p-2" />
          <div className="text-center mt-2">
            <h1 className="text-xs font-medium text-zinc-500">APPROVED LISTINGS</h1>
            <h1 className="text-xl font-bold ">{approvedListings}</h1>
          </div>
        </div>
        <div className="bg-[#FEEAEC] p-4 flex items-center justify-center flex-col rounded-md">
          <FaRegClock size={48} className="text-white bg-[#F23045] rounded-full p-2" />
          <div className="text-center mt-2">
            <h1 className="text-xs font-medium text-zinc-500">PENDING LISTINGS</h1>
            <h1 className="text-xl font-bold ">{pendingListings}</h1>
          </div>
        </div>
      </div>
      <Divider />
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <JobDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <UserDetails />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
