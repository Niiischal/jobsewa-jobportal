import { Card, Tag, message } from "antd";
import { formatDistanceToNow } from "date-fns"; // Import formatDistanceToNow from date-fns
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetSavedJobById } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetSavedJobById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setSavedJobs(response.data.savedJobs);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  return (
    <div className="flex justify-between gap-4">
      {savedJobs.map((job) => (
        <Card
          key={job.id}
          className="cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
          title={job.companyname}
        >
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
    </div>
  );
}

export default SavedJobs;
