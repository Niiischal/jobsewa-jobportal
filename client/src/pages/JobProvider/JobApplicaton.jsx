import { Card, Pagination, message } from "antd";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Applicants } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

function JobApplication() {
  const [allApplicants, setAllApplicants] = useState([]); 
  const [filteredApplicants, setFilteredApplicants] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(4); // number of applicants per page
  const [searchQuery, setSearchQuery] = useState(""); 
  const dispatch = useDispatch();
  const { id } = useParams();


  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await Applicants(id); 
      dispatch(SetLoader(false));
      if (response && response.data) {
        setAllApplicants(response.data); 
        setFilteredApplicants(response.data); 
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    getData();
  }, [id]);

  // Effect for handling search functionality
  useEffect(() => {
    const filtered = allApplicants.filter(applicant =>
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApplicants(filtered);
    setCurrentPage(1); // Reset pagination to first page on new search
  }, [searchQuery, allApplicants]);

  // Get the portion of applicants to display based on pagination
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

  // Handles page change in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          placeholder="Search by applicant's name here"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded border-solid w-full focus:outline-none focus:ring focus:ring-gray-100"
        />
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-3">
        {currentApplicants.map((user) => (
          <Card
            key={user._id}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%] cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
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
      {filteredApplicants.length > 0 && (
        <Pagination
          className="mt-4 flex justify-end"
          current={currentPage}
          total={filteredApplicants.length}
          pageSize={applicantsPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default JobApplication;