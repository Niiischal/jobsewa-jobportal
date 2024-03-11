import { Button, Card, Pagination, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetAllInterests } from "../../apicalls/interests";

function SeekerInterests() {
  const [interests, setInterests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interestsPerPage] = useState(4); // Number of jobs per page
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllInterests(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setInterests(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };


  // Get current jobs
  const indexOfLastInterest = currentPage * interestsPerPage;
  const indexOfFirstInterest = indexOfLastInterest - interestsPerPage;
  const currentInterests = interests.slice(indexOfFirstInterest, indexOfLastInterest);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-evenly mt-[10px] flex-wrap">
        {currentInterests.map((interest) => (
          <Card
            className="bg-[#fafafa] cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
            key={interest._id}
            title={interest.title}
          >
            <p className="font-semibold">Posted By: {interest.name}</p>
            <p>Email: {interest.email}</p>
            <p>Location: {interest.location}</p>
            <p>Education: {interest.education}</p>
            <p>Category: {interest.category}</p>
            <p>Experience: {interest.experience}</p>
            <p>Skills: {interest.skills}</p>
          </Card>
        ))}
      </div>
      {interests.length > 0 && (
        <Pagination
          className="mt-[10px] flex justify-end"
          current={currentPage}
          total={interests.length}
          pageSize={interestsPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default SeekerInterests;
