import { Card, message, Pagination } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(4); // Number of jobs per page
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs(null)
      dispatch(SetLoader(false));
      if (response.success) {
        setJobs(response.jobs);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-evenly mt-[10px]">
        {currentJobs.map((job) => (
          <Card
            className="border border-primary"
            key={job._id}
            title={job.category}
          >
            <p className="font-semibold">Recruiter: {job.jobProvider.name}</p>
            <p>Email: {job.jobProvider.email}</p>
            <p>
              Added On: {moment(job.createdAt).format("DD-MM-YYYY hh:mm A")}
            </p>
            <p>No of Openings: {job.openings}</p>
            <p>Duration: {job.duration}</p>
            <p>Job Level: {job.level}</p>
            <p>Education required: {job.education}</p>
            <p>Experience required: {job.experience}</p>
            <p>Status: {job.status}</p>
          </Card>
        ))}
      </div>
      {jobs.length > 0 && (
        <Pagination
          className="mt-[10px] flex justify-end"
          current={currentPage}
          total={jobs.length}
          pageSize={jobsPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Jobs;
