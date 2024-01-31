import { Button, Card, message, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";
import JobForm from "./JobForm";

function Jobs() {
  const [selectedJob, setSelectedJob] = useState();
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(4); // Number of jobs per page
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs();
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
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowJobForm(true)}>
          Add Jobs
        </Button>
      </div>
      <div className="flex justify-between mt-[10px]">
        {currentJobs.map((job) => (
          <Card
            className="border border-primary"
            key={job._id}
            title={job.category}
          >
            <p>No of Openings: {job.openings}</p>
            <p>Duration: {job.duration}</p>
            <p>Job Level: {job.level}</p>
            <p>Education required: {job.education}</p>
            <p>Experience required: {job.experience}</p>
            <p>Status: {job.status}</p>
            <div className="flex justify-between">
              <Button className="text-white bg-red-500">Delete</Button>
              <Button
                className="text-white bg-green-800"
                onClick={() => {
                  setSelectedJob(job);
                  setShowJobForm(true);
                }}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {jobs.length > jobsPerPage && (
        <Pagination
          className="mt-[10px] flex justify-end"
          current={currentPage}
          total={jobs.length}
          pageSize={jobsPerPage}
          onChange={handlePageChange}
        />
      )}
      {showJobForm && (
        <JobForm showJobForm={showJobForm} setShowJobForm={setShowJobForm} selectedJob={selectedJob} getData={getData}/>
      )}
    </div>
  );
}

export default Jobs;
