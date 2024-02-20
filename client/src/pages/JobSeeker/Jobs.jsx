import { Button, Table, Tag, message } from "antd";
import { formatDistanceToNow } from "date-fns"; // Import formatDistanceToNow from date-fns
import React, { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";
import { ApplyJob, GetJobs, SaveJobById } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";
import Filters from "../Filters";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const [savedJob, setSavedJob] = useState(() => {
    // Retrieve saved jobs from local storage
    const savedJobs = localStorage.getItem("savedJobs");
    // initialize an empty arrary if the savedJob is not found
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [appliedJob, setAppliedJob] = useState(() => {
    // Retrieve saved jobs from local storage
    const appliedJobs = localStorage.getItem("appliedJobs");
    // initialize an empty arrary if the savedJob is not found
    return appliedJobs ? JSON.parse(appliedJobs) : [];
  });
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
      const response = await GetJobs(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setJobs(response.data);
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

  useEffect(() => {
    getData();
  }, [filters]);

  const handleJobClick = (job) => {
    if (windowWidth > 768) {
      setSelectedJob(job);
    } else {
      setSelectedJob(job);
      setShowDiv(!showDiv);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleSaveJob = async (jobId) => {
    try {
      const response = await SaveJobById(jobId);
      if (response.success) {
        setSavedJob((prevSavedJobs) => ({
          ...prevSavedJobs,
          [jobId]: true,
        }));
        localStorage.setItem("savedJobs", JSON.stringify(savedJob));
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to save job. Please try again later.");
    }
  };
  const handleApplyJob = async (jobId) => {
    try {
      const response = await ApplyJob(jobId);
      if (response.success) {
        const updatedAppliedJobs = [...appliedJob, jobId];
        setAppliedJob(updatedAppliedJobs); // Update the applied job state
        localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs)); // Update local storage
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to apply for job. Please try again later.");
    }
  };

    // Function to check if a job is applied by the current user
    const isJobAppliedByUser = (jobId) => appliedJob.includes(jobId);

  return (
    <div className="flex flex-col gap-10">
      <Filters filters={filters} setFilters={setFilters} />
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
                  {job.category}
                </p>
                <div className="flex items-center gap-3 mb-2 text-[13px] text-gray-600">
                  <p>{job.companylocation}</p>

                  {/* changed the created at to ago format */}
                  <p>{formatDate(job.createdAt)}</p>
                  <p>{job.type}</p>
                </div>
                <div className="flex items-center gap-3">
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
            className="w-[69%] font-proxima overflow-y-scroll border border-gray-200 shadow-lg"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            <div className="pl-[10px] pr-[10px] pt[0] rounded-lg">
              <div className="flex gap-8">
                <div className="flex justify-between flex-col">
                  <div>
                    <h1>{selectedJob.category}</h1>
                  </div>
                  <div className="flex items-center gap-3 text-[16px] text-gray-600">
                    <span>{selectedJob.companyname}</span>
                    <span>{selectedJob.companylocation}</span>
                    <span>{selectedJob.companyemail}</span>
                  </div>
                  <div className="flex items-center gap-3 my-5 border-b dark:border-gray-900">
                    <Tag color="blue">{selectedJob.level}</Tag>
                    <Tag color="green">{selectedJob.type}</Tag>
                    <Tag color="red">{selectedJob.education}</Tag>
                    <Tag color="orange">{selectedJob.experience}</Tag>
                  </div>
                </div>
                <div className="flex flex-1 flex-col pt-[15px] items-end">
                  {savedJob[selectedJob._id] ? (
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
                  <Button
                    type="primary"
                    className="w-full mt-[4.8rem]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleApplyJob(selectedJob._id);
                    }}
                    disabled={isJobAppliedByUser(selectedJob._id)}
                  >
                    {isJobAppliedByUser(selectedJob._id) ? 'Applied' : 'Quick Apply'}
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
              </div>
            </div>
          </div>
        )}

        {windowWidth < 768 && selectedJob && (
          <div className="font-proxima mt-5">
            <div className="pl-[10px] pr-[10px] pt[0] rounded-lg border border-gray-200 shadow-lg">
              <div className="flex gap-4">
                <div className="flex justify-between flex-col">
                  <div>
                    <h2>{selectedJob.category}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-600">
                    <span>{selectedJob.companyname}</span>
                    <span>{selectedJob.companylocation}</span>
                    <span>{selectedJob.companyemail}</span>
                  </div>
                  <div className="flex items-center gap-1 my-5 border-b dark:border-gray-900">
                    <Tag color="blue">{selectedJob.level}</Tag>
                    <Tag color="green">{selectedJob.type}</Tag>
                    <Tag color="red">{selectedJob.education}</Tag>
                    <Tag color="orange">{selectedJob.experience}</Tag>
                  </div>
                </div>
                <div className="flex flex-1 flex-col pt-[15px] items-end">
                  {savedJob[selectedJob._id] ? (
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
                  <Button
                    type="primary"
                    className="w-full mt-[4.8rem]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleApplyJob(selectedJob._id);
                    }}
                    disabled={isJobAppliedByUser(selectedJob._id)}
                  >
                    {isJobAppliedByUser(selectedJob._id) ? 'Applied' : 'Quick Apply'}
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
      </div>
    </div>
  );
};

export default Jobs;