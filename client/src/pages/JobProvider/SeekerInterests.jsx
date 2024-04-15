import { Button, Card, Pagination, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CreateChat } from "../../apicalls/chats";
import { GetAllInterests } from "../../apicalls/interests";
import { SetLoader } from "../../redux/loadersSlice";

function SeekerInterests() {
  const [interests, setInterests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interestsPerPage] = useState(4); // Number of interests per page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);

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

  // Get current interests
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

  useEffect(() => {
    getData();
  }, []);

  const handleMessageRequest = async (receiverId) => {
    try {
      dispatch(SetLoader(true));
      const response = await CreateChat({
        senderId: user._id,
        receiverId: receiverId,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        navigate("/chat");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center md:justify-evenly mt-4">
        {currentInterests.map((interest) => (
          <div
            key={interest._id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
          >
            <Card
              className="bg-white cursor-pointer shadow-lg hover:shadow-xl transition duration-300"
              title={interest.title}
            >
              <p className="font-semibold">Posted By: {interest.name}</p>
              <p>Email: {interest.email}</p>
              <p>Location: {interest.location}</p>
              <div className="flex flex-wrap gap-1">
                <Tag color="blue">{interest.education}</Tag>
                <Tag color="volcano">{interest.category}</Tag>
                <Tag color="lime">{interest.experience}</Tag>
              </div>
              <p>Skills: {interest.skills}</p>
              <Button
                type="primary"
                className="w-full mt-2"
                onClick={()=>handleMessageRequest(interest.jobSeeker)}
              >
                Start a Conversation
              </Button>
            </Card>
          </div>
        ))}
      </div>
      {interests.length > 0 && (
        <Pagination
          className="mt-4 flex justify-end"
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
