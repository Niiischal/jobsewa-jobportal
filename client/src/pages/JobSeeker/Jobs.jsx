import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

const Jobs = () => {
  const [jobs, setJobs] = useState();
  const [selectedJob, setSelectedJob] = useState(null); // State to keep track of selected job

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
    // For mobile devices, do not set the selected job
    if (window.innerWidth > 768) {
      setSelectedJob(job); // Update the selected job when a card is clicked
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Job Cards */}
      <div className="md:w-[25%] p-4 bg-gray-200 overflow-y-scroll" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        <div className="flex flex-col gap-3">
          {jobs?.map((job) => (
            <div
              key={job.id}
              className="bg-gray-100 p-6 rounded-lg border-solid border-primary shadow-md grid grid-rows-auto-1fr gap-3 cursor-pointer transition duration-250 ease-in-out"
              onClick={() => handleJobClick(job)} // Call handleJobClick function when a card is clicked
            >
              <div className="flex justify-end cursor-pointer items-center">
                <IoIosHeartEmpty size={25} />
              </div>
              <p className="font-semibold">{job.category}</p>
              <p className="text-gray-400">{job.companyname}</p>
              <p>{job.companylocation}</p>
              <p>Job Level: {job.level}</p>
              <p>Education required: {job.education}</p>
              <p>Experience required: {job.experience}</p>
              <div className="flex justify-between">
                <Button className="text-white bg-green-800" onClick={() => {}}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details - Only for desktop */}
      {window.innerWidth > 768 && selectedJob && (
        <div className="w-1/2 p-4 bg-white">
          <div>
            <h1>{`Content for ${selectedJob.category}`}</h1>
            <p>{`Company: ${selectedJob.companyname}`}</p>
            <p>{`Location: ${selectedJob.companylocation}`}</p>
            {/* Render additional details or components related to the selected job */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
