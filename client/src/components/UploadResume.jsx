import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { GetCurrentUser, ResumeUpload } from "../apicalls/users";
import { SetUser } from "../redux/usersSlice";

const UploadResume = ({ selectedUser, getData }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();


  const handleUpload = async () => {
    try {
      dispatch(SetLoader(true));

      // Check if selectedUser is defined before accessing its properties
      if (!selectedUser || !selectedUser._id) {
        throw new Error("Selected user or user ID is undefined");
      }

      //upload file to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", selectedUser._id);
      const response = await ResumeUpload(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };



  return (
    <div className="flex justify-center items-center mt-5 flex-col border border-solid border-primary p-6">
      <div className="flex items-center flex-col">
        <SlCloudUpload size={150} color="#2a68ff" />
        <h1>Upload Your Resume.</h1>
        <p>Upload your resume to ensure employers can easily find you</p>
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
        }}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Select or Drag drop your resume
        </Button>
      </Upload>
      <Button
        disabled={!file}
        onClick={handleUpload}
        style={{
          marginTop: 16,
          width: 200,
        }}
      >
        Upload
      </Button>
    </div>
  );
};
export default UploadResume;
