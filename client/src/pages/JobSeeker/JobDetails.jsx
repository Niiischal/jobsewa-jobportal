import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetJobById } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function JobDetails() {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

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

  return (
    job && (
      <div>
        <h1>{job.category}</h1>
        <p>{job.companyname}</p>
        <p>{job.companylocation}</p>
      </div>
    )
  );
}

export default JobDetails;
