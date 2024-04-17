import {
  Button,
  Card,
  Modal,
  Pagination,
  Popconfirm,
  Table,
  Tag,
  message,
} from "antd";
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
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setJobs(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateJobStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

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
          <Button
            type="default"
            onClick={() => onStatusUpdate(_id, "approved")}
          >
            Approve
          </Button>
        )}
        {status === "pending" && (
          <Button danger onClick={() => onStatusUpdate(_id, "rejected")}>
            Reject
          </Button>
        )}
        {status === "approved" && (
          <Popconfirm
            title="Are you sure to block this Job?"
            onConfirm={() => onStatusUpdate(_id, "blocked")}
            okText="Yes"
            cancelText="No"
            okType="default"
          >
            <Button danger>Block</Button>
          </Popconfirm>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <Card
            className="bg-[#fafafa] cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
            key={job._id}
            title={job.title}
          >
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedJob(job);
                setShowJobModal(true);
              }}
            >
              <p className="font-semibold">Company Name: {job.companyname}</p>
              <p className="font-semibold">Recruiter: {job.jobProvider.name}</p>
              <p>Category: {job.category}</p>
              <p>Email: {job.jobProvider.email}</p>
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
            </div>
            <ActionButtons
              status={job.status}
              _id={job._id}
              onStatusUpdate={onStatusUpdate}
            />
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
      <Modal
        open={showJobModal}
        onCancel={() => setShowJobModal(false)}
        centered
        width={"90%"}
        footer={null}
      >
        {selectedJob && (
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
      </Modal>
    </div>
  );
}

export default JobDetails;
