import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React from "react";
import { SlCloudUpload } from "react-icons/sl";
const UploadResume = () => {

  const handleUpload = async () => {
  }

  return (
    <div className="flex justify-center items-center mt-5 flex-col border border-solid border-primary p-6">
      <div className="flex items-center flex-col">
        <SlCloudUpload size={150} color="#2a68ff" />
        <h1>Upload Your Resume.</h1>
        <p>Upload your resume to ensure employers can easily find you</p>
      </div>
      <Upload listType="picture" beforeUpload={() => false}>
        <Button type="primary" icon={<UploadOutlined/>}>Select or Drag drop your resume</Button>
      </Upload>
      <Button
        onChange={handleUpload}
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
