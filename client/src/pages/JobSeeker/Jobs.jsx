import { Button, Modal, Table, Tag, message } from "antd";
import { formatDistanceToNow } from "date-fns"; // Import formatDistanceToNow from date-fns
import React, { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ApplyJob,
  GetJobs,
  GetAppliedJobById,
  SaveJobById,
} from "../../apicalls/jobs";
import { AddNotification } from "../../apicalls/notifications";
import { SetLoader } from "../../redux/loadersSlice";
import Filters from "../Filters";
const Jobs = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [remainingTime, setRemainingTime] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to keep track of window width

  const JobDetailsTable = ({ selectedJob }) => {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        render: (text) => <span style={{ fontWeight: "600" }}>{text}</span>,
      },
      {
        title: "Value",
        dataIndex: "value",
      },
    ];

    const data = [
      {
        key: "openings",
        title: "Job Openings",
        value: selectedJob.openings,
      },
      {
        key: "salaryperiod",
        title: "Salary Period",
        value: selectedJob.salaryperiod,
      },
      {
        key: "salaryamount",
        title: "Salary Amount",
        value: selectedJob.salaryamount,
      },
      {
        key: "skills",
        title: "Job Skills",
        value: selectedJob.skills,
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        showHeader={false}
      />
    );
  };

  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    level: [],
    type: [],
  });

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs({ ...filters, search: searchQuery });
      dispatch(SetLoader(false));
      if (response.success) {
        const updatedJobs = response.data.map((job) => ({
          ...job,
          isSaved: savedJobs.includes(job._id),
          isApplied: appliedJobs.includes(job._id),
        }));
        setJobs(updatedJobs);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, [filters, searchQuery, savedJobs, appliedJobs]);

  const handleJobClick = (job) => {
    if (windowWidth > 768) {
      setSelectedJob(job);
    } else {
      setSelectedJob(job);
      setShowJobModal(true);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  useEffect(() => {
    if (selectedJob && selectedJob.duration && selectedJob.createdAt) {
      const duration = parseInt(selectedJob.duration.split(" ")[0], 10);
      const expirationDate = new Date(selectedJob.createdAt);
      expirationDate.setDate(expirationDate.getDate() + duration);
      const remaining = formatDistanceToNow(expirationDate, {
        addSuffix: true,
      });
      setRemainingTime(remaining);
    }
  }, [selectedJob]);

  const { user } = useSelector((state) => state.users);

  const handleSaveJob = async (jobId) => {
    try {
      const response = await SaveJobById(jobId);
      if (response.success) {
        setSavedJobs((prevSavedJobs) => [...prevSavedJobs, jobId]);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to save job. Please try again later.");
    }
  };

  // const isJobSaved = (jobId) => {
  //   return savedJobs.includes(jobId) || (user && user.isJobSaved);
  // };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await GetAppliedJobById();
        if (response.success) {
          setAppliedJobs(response.data.appliedJobs);
        }
      } catch (error) {
        message.error("Failed to retrived applied jobs");
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleApplyJob = async (jobId) => {
    try {
      dispatch(SetLoader(true));
      const response = await ApplyJob(jobId);
      if (response.success) {
        setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobId]);
        message.success(response.message);
        dispatch(SetLoader(false));
        //send notification to provider
        await AddNotification({
          title: "Job Application Alert!",
          message: ` ${user.name} applied on your job, ${selectedJob.title}.`,
          user: selectedJob.jobProvider._id,
          onClick: `/jobprovider-home`,
          read: false,
        });
      } else {
        dispatch(SetLoader(false));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const isJobApplied = (jobId) => {
    return appliedJobs.includes(jobId);
  };

  const isDeadlinePassed = () => {
    if (!selectedJob || !selectedJob.createdAt || !selectedJob.duration) {
      return false;
    }
    const duration = parseInt(selectedJob.duration.split(" ")[0], 10);
    const expirationDate = new Date(selectedJob.createdAt);
    expirationDate.setDate(expirationDate.getDate() + duration);

    return expirationDate < new Date();
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search job by title here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded border-solid w-full focus:outline-none focus:ring focus:ring-gray-100"
          />
          <IoSearch
            size={18}
            className="cursor-pointer border border-gray-300 rounded border-solid p-2 h-[20px] w-10 bg-primary text-white ml-2"
            onClick={handleSearch}
          />
        </div>
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex flex-col md:flex-row">
        <div
          className="md:w-[28%] p-4 overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.companyname}
                  </h2>
                </div>
                <p className="text-base font-semibold text-gray-700 mb-2">
                  {job.title}
                </p>
                <div className="flex items-center gap-3 mb-2 text-[13px] text-gray-600">
                  <p>{job.companylocation}</p>

                  {/* changed the created at to ago format */}
                  <p>{formatDate(job.createdAt)}</p>
                  <p>{job.type}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Tag color="lime">{job.category}</Tag>
                  <Tag color="blue">{job.level}</Tag>
                  <Tag color="green">{job.education}</Tag>
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    {job.description && job.description.slice(0, 200) + "..."}
                  </p>
                </div>
                <Button type="primary" className="w-full mt-4" disabled>
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {windowWidth > 768 && selectedJob && (
          <div
            className="w-[69%] overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            <div className="pl-[10px] pr-[10px] pt[0] rounded-lg">
              <div className="flex gap-8">
                <div className="flex justify-between flex-col">
                  <div>
                    <h1>{selectedJob.title}</h1>
                  </div>
                  <div className="flex items-center gap-3 text-[16px] text-gray-600 font-proxima">
                    <span>{selectedJob.companyname}</span>
                    <span>{selectedJob.companylocation}</span>
                    <span>{selectedJob.companyemail}</span>
                  </div>
                  <div className="flex items-center justify-between my-5 border-b dark:border-gray-900">
                    <Tag color="lime">{selectedJob.category}</Tag>
                    <Tag color="blue">{selectedJob.level}</Tag>
                    <Tag color="green">{selectedJob.type}</Tag>
                    <Tag color="red">{selectedJob.education}</Tag>
                    <Tag color="orange">{selectedJob.experience}</Tag>
                  </div>
                </div>
                <div className="flex flex-1 flex-col pt-[15px] items-end">
                  {selectedJob && (
                    <div>
                      {user && user.savedJobs.includes(selectedJob._id) ? (
                        <IoIosHeart
                          size={24}
                          className="text-red-500 cursor-not-allowed"
                        />
                      ) : (
                        <IoIosHeartEmpty
                          size={24}
                          className="text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleSaveJob(selectedJob._id);
                          }}
                        />
                      )}
                    </div>
                  )}
                  <Button
                    type="primary"
                    className="w-full mt-[4.8rem]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleApplyJob(selectedJob._id);
                    }}
                    disabled={
                      isJobApplied(selectedJob._id) || isDeadlinePassed()
                    }
                  >
                    {isJobApplied(selectedJob._id) ? "Applied" : "Quick Apply"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="pl-[10px] pr-[10px]">
              <div className="details flex flex-col gap-3">
                <div className="descprition">
                  <h2>Description</h2>
                  <span className="text-[16px] text-gray-500">
                    {selectedJob.description}
                  </span>
                </div>
                <div className="specification">
                  <h2>Specification</h2>
                  <span className="text-[16px] text-gray-500">
                    {selectedJob.specification}
                  </span>
                </div>
                <div className="facts">
                  <h2>Numbers & Facts</h2>
                  <JobDetailsTable selectedJob={selectedJob} />
                </div>
                {remainingTime && (
                  <div>
                    <h3 className="text-red-500">Deadline: {remainingTime}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Modal
          open={showJobModal}
          onCancel={() => setShowJobModal(false)}
          centered
          width={"90%"}
          footer={null}
        >
          {windowWidth < 768 && selectedJob && (
            <div className="font-proxima mt-5">
              <div className="pl-[10px] pr-[10px] pt[0] rounded-lg border border-gray-200 shadow-lg">
                <div className="flex gap-4">
                  <div className="flex justify-between flex-col">
                    <div>
                      <h2>{selectedJob.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                      <span>{selectedJob.companyname}</span>
                      <span>{selectedJob.companylocation}</span>
                      <span>{selectedJob.companyemail}</span>
                    </div>
                    <div className="flex items-center gap-1 my-5 border-b dark:border-gray-900">
                      <Tag color="blue">{selectedJob.category}</Tag>
                      <Tag color="green">{selectedJob.level}</Tag>
                    </div>
                    <div className="flex items-center justify-between my-1 border-b dark:border-gray-900">
                      <Tag color="green">{selectedJob.type}</Tag>
                      <Tag color="red">{selectedJob.education}</Tag>
                      <Tag color="orange">{selectedJob.experience}</Tag>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col pt-[15px] items-end">
                    {selectedJob && (
                      <div>
                        {user && user.savedJobs.includes(selectedJob._id) ? (
                          <IoIosHeart
                            size={24}
                            className="text-red-500 cursor-not-allowed"
                          />
                        ) : (
                          <IoIosHeartEmpty
                            size={24}
                            className="text-red-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event bubbling
                              handleSaveJob(selectedJob._id);
                            }}
                          />
                        )}
                      </div>
                    )}
                  <Button
                    type="primary"
                    className="w-full mt-[4.8rem]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleApplyJob(selectedJob._id);
                    }}
                    disabled={
                      isJobApplied(selectedJob._id) || isDeadlinePassed()
                    }
                  >
                    {isJobApplied(selectedJob._id) ? "Applied" : "Quick Apply"}
                  </Button>
                  </div>
                </div>
              </div>
              <div className="pl-[10px] pr-[10px]">
                <div className="details flex flex-col gap-3">
                  <div className="descprition">
                    <h3>Description</h3>
                    <span className="text-[14px] text-gray-500">
                      {selectedJob.description}
                    </span>
                  </div>
                  <div className="specification">
                    <h3>Specification</h3>
                    <span className="text-[14px] text-gray-500">
                      {selectedJob.specification}
                    </span>
                  </div>
                  <div className="facts">
                    <h3>Numbers & Facts</h3>
                    <JobDetailsTable selectedJob={selectedJob} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Jobs;
