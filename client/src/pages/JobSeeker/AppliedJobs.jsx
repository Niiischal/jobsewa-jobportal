import { Card, Modal, Pagination, Table, Tag, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetAppliedJobById } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState();
  const [showJobModal, setShowJobModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(4); // Number of jobs per page
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAppliedJobById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setAppliedJobs(response.data.appliedJobs);
        setFilteredJobs(response.data.appliedJobs); // Initialize filteredJobs with all applied jobs
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  // Effect for handling search functionality
  useEffect(() => {
    const filtered = appliedJobs.filter((job) =>
      job.companyname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset pagination to first page on new search
  }, [searchQuery, appliedJobs]);

  // Get the portion of jobs to display based on pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handles page change in pagination
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

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  // Handles updates to the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded border-solid w-full focus:outline-none focus:ring focus:ring-gray-100"
      />
      </div>
      {currentJobs.map((job) => (
        <Card
          key={job.id}
          className="cursor-pointer shadow-lg hover:shadow-xl transition duration-300 mt-3"
          title={job.companyname}
          onClick={() => {
            setSelectedJob(job);
            setShowJobModal(true);
          }}
        >
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <p className="text-base font-semibold text-gray-700 mb-2">
            {job.category}
          </p>
          <div className="flex items-center gap-3 mb-2 text-[13px] text-gray-600">
            <p>{job.companylocation}</p>
            <p>{formatDate(job.createdAt)}</p>
            <p>{job.type}</p>
          </div>
          <div className="flex items-center gap-3">
            <Tag color="blue">{job.level}</Tag>
            <Tag color="green">{job.education}</Tag>
          </div>
          <p className="text-sm text-gray-700">
            {job.description && job.description.slice(0, 180) + "..."}
          </p>
        </Card>
      ))}

      {filteredJobs.length > jobsPerPage && (
        <Pagination
          className="mt-4 flex justify-end"
          current={currentPage}
          total={filteredJobs.length}
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
                    <h2>{selectedJob.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-600">
                    <span>{selectedJob.companyname}</span>
                    <span>{selectedJob.companylocation}</span>
                    <span>{selectedJob.companyemail}</span>
                  </div>
                  <div className="flex items-center gap-1 my-5 border-b dark:border-gray-900">
                    <Tag color="lime">{selectedJob.category}</Tag>
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

export default AppliedJobs;
