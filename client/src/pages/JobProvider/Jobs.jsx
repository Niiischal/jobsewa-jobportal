import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";
import JobForm from "./JobForm";

function Jobs() {
  const [jobs, setJobs] = useState();
  const [showJobForm, setShowJobForm] = useState(false);
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

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowJobForm(true)}>
          Add Jobs
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {jobs &&
          jobs.map((job) => (
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
            </Card>
          ))}
      </div>
      {showJobForm && (
        <JobForm showJobForm={showJobForm} setShowJobForm={setShowJobForm} />
      )}
    </div>
  );
}

export default Jobs;
