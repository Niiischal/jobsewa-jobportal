import { Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Applicants } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function JobApplication() {
  const [applicants, SetApplicants] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await Applicants(id);
      console.log(response.data);
      dispatch(SetLoader(false));
      if (response.success) {
        SetApplicants(response.data);
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
    <div className="flex justify-between gap-4">
      {applicants.map((user) => (
        <Card
          key={user._id} // Use the user's ID as the key
          className="cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          title={user.name}
        >
          <div className="flex items-center gap-3 mb-2 text-[13px] text-gray-600">
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Pdf: {user.pdf}</p>
          </div>
          <div>
            <p>Applied Jobs:</p>
            {user.appliedJobs.map((jobId) => (
              <p key={jobId}>{jobId}</p>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default JobApplication;
