import { Card, message, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Applicants } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function JobApplication() {
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(4); // Number of applicants per page
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await Applicants(id);
      console.log(response.data);
      dispatch(SetLoader(false));
      if (response.success) {
        setApplicants(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Get current applicants
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = applicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        {currentApplicants.map((user) => (
          <Card
            key={user._id} 
            className="w-full sm:w-[48%] md:w-[30%] cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
            title={user.name}
          >
            <div className="flex flex-col mb-2 text-[13px] text-gray-600">
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <a href={user.pdf} target="_blank" rel="noopener noreferrer">
                <p>Resume of the User</p>
              </a>
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
      {applicants.length > 0 && (
        <Pagination
          className="mt-4 flex justify-end"
          current={currentPage}
          total={applicants.length}
          pageSize={applicantsPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default JobApplication;
