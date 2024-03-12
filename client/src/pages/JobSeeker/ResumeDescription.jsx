import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetResume } from '../../apicalls/resumes';
import { SetLoader } from '../../redux/loadersSlice';

function ResumeDescription() {
  const [resume, setResume] = useState(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetResume({
        jobSeeker: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success && response.data.length > 0) {
        setResume(response.data[0]);
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Resume Description</h1>
      {resume !== null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p><strong>Name:</strong> {resume.name}</p>
            <p><strong>Email:</strong> {resume.email}</p>
            <p><strong>Location:</strong> {resume.location}</p>
            <p><strong>Contact Number:</strong> {resume.contact}</p>
            <p><strong>About Me:</strong> {resume.about}</p>
            {/* Display other personal information fields if available */}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Links</h2>
            <ul>
              {resume.links.map((link, index) => (
                <li key={index}><a href={link}>{link}</a></li>
              ))}
            </ul>
            {/* Display other sections of the resume such as education, experience, projects, etc. */}
          </div>
        </div>
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  );
}

export default ResumeDescription;
