import { Button, Card, message, Modal, Pagination, Popconfirm, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteJob, GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";
import JobForm from "./JobForm";

function Jobs() {
  const [selectedJob, setSelectedJob] = useState();
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(4); // Number of jobs per page
  const { user } = useSelector((state) => state.users);
  const [showJobModal, setShowJobModal] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs({
        jobProvider: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setJobs(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteJob(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
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


  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setSelectedJob(null);
            setShowJobForm(true);
          }}
        >
          Add Jobs
        </Button>
      </div>
      <div className="flex justify-between mt-[10px]">
        {currentJobs.map((job) => (
          <Card
            className="bg-[#fafafa] cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
            key={job._id}
            title={job.category}
            onClick={() => {
              setSelectedJob(job); 
              setShowJobModal(true); 
            }}
          >
            <p>
              Added On: {moment(job.createdAt).format("DD-MM-YYYY hh:mm A")}
            </p>
            <p>No of Openings: {job.openings}</p>
            <p>Duration: {job.duration}</p>
            <p>Job Level: {job.level}</p>
            <p>Education required: {job.education}</p>
            <p>Experience required: {job.experience}</p>
            <p>
              Status: <StatusTag status={job.status} />
            </p>
            <div className="flex justify-between">
              <Popconfirm
                title="Are you sure to delete this job?"
                onConfirm={() => deleteJob(job._id)}
                okText="Yes"
                cancelText="No"
                okType="default"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Button
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
      {jobs.length > 0 && (
        <Pagination
          className="mt-[10px] flex justify-end"
          current={currentPage}
          total={jobs.length}
          pageSize={jobsPerPage}
          onChange={handlePageChange}
        />
      )}
      {showJobForm && (
        <JobForm
          showJobForm={showJobForm}
          setShowJobForm={setShowJobForm}
          selectedJob={selectedJob}
          getData={getData}
        />
      )}
      {currentJobs.map((job) => (
        <Modal
          open={showJobModal}
          onCancel={() => setShowJobModal(false)}
          centered
          width={"90%"}
          footer={null}
          key={job._id}
        >
          <div className="font-proxima mt-5">
            <div className="pl-[10px] pr-[10px] pt[0] rounded-lg border border-gray-200 shadow-lg">
              <div className="flex gap-4">
                <div className="flex justify-between flex-col">
                  <div>
                    <h2>{job.category}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-600">
                    <span>{job.companyname}</span>
                    <span>{job.companylocation}</span>
                    <span>{job.companyemail}</span>
                  </div>
                  <div className="flex items-center gap-1 my-5 border-b dark:border-gray-900">
                    <Tag color="blue">{job.level}</Tag>
                    <Tag color="green">{job.type}</Tag>
                    <Tag color="red">{job.education}</Tag>
                    <Tag color="orange">{job.experience}</Tag>
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-[10px] pr-[10px]">
              <div className="details flex flex-col gap-3">
                <div className="descprition">
                  <h3>Description</h3>
                  <span className="text-[14px] text-gray-500">
                    {job.description}
                  </span>
                </div>
                <div className="specification">
                  <h3>Specification</h3>
                  <span className="text-[14px] text-gray-500">
                    {job.specification}
                  </span>
                </div>
                <div className="facts">
                  <h3>Numbers & Facts</h3>
                  <JobDetailsTable selectedJob={selectedJob} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ))}
    </div>
  );
}

export default Jobs;
