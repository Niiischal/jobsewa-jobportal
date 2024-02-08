import { message } from "antd";
import React, { useEffect, useState } from "react";
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
    <div>
      {jobs?.map((job) => {
        return (
          <div>
            <h1>{job.category}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Jobs;
