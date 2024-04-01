import { Button, Modal, Table, Tag, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetJobs } from "../apicalls/jobs";
import Navbar from "../components/Navbar";
import { SetLoader } from "../redux/loadersSlice";
import Filters from "./Filters";

const Home = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

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
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    level: [],
    type: [],
  });

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs({ filters, search: searchQuery });
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, [filters, searchQuery]);

  const handleJobClick = (job) => {
    if (windowWidth > 768) {
      setSelectedJob(job);
    } else {
      setSelectedJob(job);
      setShowJobModal(true);
    }
  };

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div>
      <Navbar label="login"/>
      <div className="flex flex-col bg-[#e7e8e8] rounded-lg">
        <h1 className="text-center">
          Find the <span className="text-primary">right</span> job <span className="text-primary">.</span>
        </h1>
        <div className="flex flex-col gap-1">
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search job by title here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded border-solid w-[50%] focus:outline-none focus:ring focus:ring-gray-100"
          />
          <IoSearch
            size={18}
            className="cursor-pointer border border-gray-300 rounded border-solid p-2 h-[20px] w-10 bg-primary text-white ml-2"
            onClick={handleSearch}
          />
        </div>
        <Filters filters={filters} setFilters={setFilters} />
      </div>
      </div>
      <div className="flex flex-col md:flex-row mt-5">
        <div
          className="md:w-[28%] p-4 overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {job.companyname}
                  </h2>
                </div>
                <p className="text-base font-semibold text-gray-700 mb-2">
                  {job.category}
                </p>
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
                  <p className="text-sm text-gray-700">
                    {job.description && job.description.slice(0, 200) + "..."}
                  </p>
                </div>
                <Button type="primary" className="w-full mt-4"
                 onClick={() => navigate("/login")}>
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {windowWidth > 768 && selectedJob && (
          <div
            className="w-[69%] overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            <div className="pl-[10px] pr-[10px] pt[0] rounded-lg">
              <div className="flex gap-8">
                <div className="flex justify-between flex-col">
                  <div>
                    <h1>{selectedJob.category}</h1>
                  </div>
                  <div className="flex items-center gap-3 text-[16px] text-gray-600 font-proxima">
                    <span>{selectedJob.companyname}</span>
                    <span>{selectedJob.companylocation}</span>
                    <span>{selectedJob.companyemail}</span>
                  </div>
                  <div className="flex items-center gap-3 my-5 border-b dark:border-gray-900">
                    <Tag color="blue">{selectedJob.level}</Tag>
                    <Tag color="green">{selectedJob.type}</Tag>
                    <Tag color="red">{selectedJob.education}</Tag>
                    <Tag color="orange">{selectedJob.experience}</Tag>
                  </div>
                </div>
                <div className="flex flex-1 flex-col pt-[15px] items-end">
                    <IoIosHeartEmpty
                      size={24}
                      className="text-red-500 cursor-not-allowed"
                      onClick={() => navigate("/login")}
                    />
                  <Button
                    type="primary"
                    className="w-full mt-[4.8rem]"
                    onClick={() => navigate("/login")}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="pl-[10px] pr-[10px]">
              <div className="details flex flex-col gap-3">
                <div className="descprition">
                  <h2>Description</h2>
                  <span className="text-[16px] text-gray-500">
                    {selectedJob.description}
                  </span>
                </div>
                <div className="specification">
                  <h2>Specification</h2>
                  <span className="text-[16px] text-gray-500">
                    {selectedJob.specification}
                  </span>
                </div>
                <div className="facts">
                  <h2>Numbers & Facts</h2>
                  <JobDetailsTable selectedJob={selectedJob} />
                </div>
              </div>
            </div>
          </div>
        )}

<Modal
          open={showJobModal}
          onCancel={() => setShowJobModal(false)}
          centered
          width={"90%"}
          footer={null}
        >
          {windowWidth < 768 && selectedJob && (
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
                  <div className="flex flex-1 flex-col pt-[15px] items-end">
                      <IoIosHeartEmpty
                        size={24}
                        className="text-red-500 cursor-not-allowed"
                        onClick={() => navigate("/login")}
                      />
                    <Button
                      type="primary"
                      className="w-full mt-[4.8rem]"
                      onClick={() => navigate("/login")}>
                        Apply Now
                    </Button>
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
    </div>
  );
};

export default Home;
