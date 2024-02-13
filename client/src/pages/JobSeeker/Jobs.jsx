import { Button, Table, Tag, message } from "antd";
import { formatDistanceToNow } from "date-fns"; // Import formatDistanceToNow from date-fns
import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetJobs, SaveJobById } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";
import Filters from "../Filters";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJob, setSavedJob] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to keep track of window width
  const navigate = useNavigate();

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

  const { user } = useSelector((state) => state.users);
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
    getData()
  }, [filters]);

  const handleJobClick = (job) => {
    if (windowWidth > 768) {
      setSelectedJob(job);
    } else {
      navigate(`/job-details/${job._id}`);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  useEffect(() => {
    console.log("Saved Jobs:", savedJob);
  }, [savedJob]);

  const handleSaveJob = async (jobId) => {
    try {
      const response = await SaveJobById(jobId);
      if (response.success) {
        setSavedJob([...savedJob, jobId]); // Add the saved job ID to the state
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to save job. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Filters
        filters={filters}
        setFilters={setFilters}
      />
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
                  <IoIosHeartEmpty size={24} className="text-red-500" />
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
                <Button type="primary" className="w-full mt-4">
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
                {savedJob.includes(selectedJob._id) ? (
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
                  <Button type="primary" className="w-full mt-[4.8rem]">
                    Quick Apply
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
      </div>
    </div>
  );
};

export default Jobs;
