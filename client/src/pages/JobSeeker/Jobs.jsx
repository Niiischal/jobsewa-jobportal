import { Button, message, Tag } from "antd";
import { formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow from date-fns
import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: "approved",
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

  const handleJobClick = (job) => {
    if (window.innerWidth > 768) {
      setSelectedJob(job);
    } else {
      navigate("/job-details", { state: { selectedJob: job } });
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-[28%] p-4 overflow-y-scroll" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => handleJobClick(job)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{job.companyname}</h2>
                <IoIosHeartEmpty size={24} className="text-red-500" />
              </div>
              <p className="text-base font-semibold text-gray-700 mb-2">{job.category}</p>
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
              <p className="text-sm text-gray-700">{job.description && job.description.slice(0, 200) + "..."}</p>
              </div>
              <Button type="primary" className="w-full mt-4">
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </div>

      {window.innerWidth > 768 && selectedJob && (
        <div className="w-1/2 p-4 bg-white">
          <div>
            <h1>{`Content for ${selectedJob.category}`}</h1>
            <p>{`Company: ${selectedJob.companyname}`}</p>
            <p>{`Location: ${selectedJob.companylocation}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
