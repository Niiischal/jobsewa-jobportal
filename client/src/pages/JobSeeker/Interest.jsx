import { Button, Card, Pagination, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteInterest, GetInterests } from "../../apicalls/interests";
import { SetLoader } from "../../redux/loadersSlice";
import InterestForm from "./InterestForm";

function Interest() {
  const [selectedInterest, setSelectedInterest] = useState();
  const [interests, setInterests] = useState([]);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [interestsPerPage] = useState(4); // Number of jobs per page
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetInterests({
        jobSeeker: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setInterests(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteInterest = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteInterest(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Get current jobs
  const indexOfLastInterest = currentPage * interestsPerPage;
  const indexOfFirstInterest = indexOfLastInterest - interestsPerPage;
  const currentInterests = interests.slice(
    indexOfFirstInterest,
    indexOfLastInterest
  );

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setSelectedInterest(null)
            setShowInterestForm(true);
          }}
        >
          Post Interest
        </Button>
      </div>
      <div className="flex justify-between mt-[10px]">
        {currentInterests.map((interest) => (
          <Card
            className="border border-primary"
            key={interest._id}
            title={interest.title}
          >
            <p>Category: {interest.category}</p>
            <p>Full Name: {interest.name}</p>
            <p>Email: {interest.email}</p>
            <p>Location: {interest.location}</p>
            <p>Education: {interest.education}</p>
            <p>Experience: {interest.experience}</p>
            <p>Skills: {interest.skills}</p>
            <div className="flex justify-between">
            <Popconfirm
                title="Are you sure to delete this job?"
                onConfirm={() => deleteInterest(interest._id)}
                okText="Yes"
                cancelText="No"
                okType="default"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Button
                onClick={() => {
                  setSelectedInterest(interest);
                  setShowInterestForm(true);
                }}
              >
                Edit
              </Button>
            </div>
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
      {showInterestForm && (
        <InterestForm
          showInterestForm={showInterestForm}
          setShowInterestForm={setShowInterestForm}
          selectedInterest={selectedInterest}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Interest;
