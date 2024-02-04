import { Button, Card, Pagination, Tag, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetJobs, UpdateJobStatus } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function JobDetails() {
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

  const onStatusUpdate = async (id, status) => {
    try {
        dispatch(SetLoader(true))
        const response = await UpdateJobStatus(id, status)
        dispatch(SetLoader(false))
        if(response.success){
            message.success(response.message)
            getData()
        }
        else{
            throw new Error(response.message)
        }
    } catch (error) {
        dispatch(SetLoader(false))
        message.error(error.message)
    }
  }


  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const StatusTag = ({ status }) => {
    let tagColor;
  
    switch (status) {
      case "approved":
        tagColor = "success";
        break;
      case "pending":
        tagColor = "processing";
        break;
      case "rejected":
        tagColor = "error";
        break;
      case "blocked":
        tagColor = "error";
        break;
      default:
        tagColor = "default";
    }
  
    return <Tag color={tagColor}>{status.toUpperCase()}</Tag>;
  };

  const ActionButtons = ({ status, _id, onStatusUpdate }) => {
    return (
      <div className="flex gap-3 justify-center">
        {status === "pending" && (
          <Button type="default" onClick={() => onStatusUpdate(_id, "approved")}>
            Approve
          </Button>
        )}
        {status === "pending" && (
          <Button danger onClick={() => onStatusUpdate(_id, "rejected")}>
            Reject
          </Button>
        )}
        {status === "approved" && (
          <Button danger onClick={() => onStatusUpdate(_id, "blocked")}>
            Block
          </Button>
        )}
        {status === "blocked" && (
          <Button onClick={() => onStatusUpdate(_id, "approved")}>
            Unblock
          </Button>
        )}
        {status === "rejected" && (
          <div className="flex gap-3">
            <Button type="default" disabled>
              Approve
            </Button>
            <Button danger disabled>
              Reject
            </Button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

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
            <p>Status: <StatusTag status={job.status} /></p>
            <ActionButtons status={job.status} _id={job._id} onStatusUpdate={onStatusUpdate} />
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

export default JobDetails;
