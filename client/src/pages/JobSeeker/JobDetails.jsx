import { Button, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetJobById } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function JobDetails() {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to keep track of window width
  const { id } = useParams();

  const JobDetailsTable = ({ job }) => {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        render: (text) => <span style={{ fontWeight: '600' }}>{text}</span>, 
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
        value: job.openings,
      },
      {
        key: "salaryperiod",
        title: "Salary Period",
        value: job.salaryperiod,
      },
      {
        key: "salaryamount",
        title: "Salary Amount",
        value: job.salaryamount,
      },
      {
        key: "skills",
        title: "Job Skills",
        value: job.skills,
      },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} bordered={false} showHeader={false} />;
  };

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setJob(response.data);
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

  return (
    windowWidth < 768 && job && (
      <div
      className="font-proxima"
    >
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
          <div className="flex flex-1 flex-col pt-[15px] items-end">
            <IoIosHeartEmpty size={24} className="text-red-500 hover:cursor-pointer" />
            <Button type="primary" className="w-full mt-[4.8rem]">
              Quick Apply
            </Button>
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
            <JobDetailsTable job={job} />
          </div>
        </div>
      </div>
    </div>
    )
  );
}

export default JobDetails;
