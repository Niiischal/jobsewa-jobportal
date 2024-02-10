import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GetJobs } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

const Jobs = () => {
  const [jobs, setJobs] = useState();
  const [filters, setFilters] = useState({
    status: "approved",
  });
  
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetJobs(filters);
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
    getData()
  }, []);

  return (
    <div className="flex gap-3">
       {jobs?.map((job) => (
          <Card
            className="border border-primary"
            key={job._id}
          >
            <div className="flex justify-end cursor-pointer">
            <IoIosHeartEmpty size={25} />
            </div>
            <p>{job.companyname}</p>
            <p>{job.companylocation}</p>
            <p>Job Level: {job.level}</p>
            <p>Education required: {job.education}</p>
            <p>Experience required: {job.experience}</p>
            <div className="flex justify-between">
              <Button
                className="text-white bg-green-800"
                onClick={() => {
                }}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Jobs;
