import { Button, message, Table } from "antd";
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

  const columns = [
    {
      title: "No of Openings",
      dataIndex: "openings",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Job Level",
      dataIndex: "level",
    },
    {
      title: "Education required",
      dataIndex: "education",
    },
    {
      title: "Experience required",
      dataIndex: "experience",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

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
      <Table columns={columns} dataSource={jobs} />
      {showJobForm && (
        <JobForm showJobForm={showJobForm} setShowJobForm={setShowJobForm} />
      )}
    </div>
  );
}

export default Jobs;
