import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResumeUpload } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";
import { SetUser } from "../../redux/usersSlice";

function InitialPDF() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.users);

  const handleUpload = async () => {
    try {
      dispatch(SetLoader(true));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user._id);

      const response = await ResumeUpload(formData);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        // Updating user data in the Redux store
        const updatedUser = {
          ...user,
          files: user.files
            ? [...user.files, response.result.secure_url]
            : [response.result.secure_url],
        };
        dispatch(SetUser(updatedUser));
        navigate("/jobseeker-home")
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
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
          onClick={() => {
            console.log("handleUpload function called");
            handleUpload();
          }}
          style={{
            marginTop: 16,
            width: 200,
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default InitialPDF;
