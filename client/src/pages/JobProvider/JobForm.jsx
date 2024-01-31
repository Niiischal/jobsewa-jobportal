import { Col, Form, Input, Modal, Row, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddJob } from "../../apicalls/jobs";
import { SetLoader } from "../../redux/loadersSlice";

const categoryOptions = [
  "Accounting / Finance",
  "Architecture / Interior Design",
  "Banking / Insurance / Financial Services",
  "Commercial / Logistics / Supply Chain",
  "Construction / Engineering / Architects",
  "Creative / Content / Graphics / Video Editing",
  "Hospitality / Tourism",
  "IT / Telecommunication",
];

const durationOptions = ["14 Days", "30 Days"];

const levelOptions = [
  "Entry Level",
  "Junior Level",
  "Senior Level",
  "Mid Level",
];

const educationOptions = [
  "below SLC/SEE",
  "SLC/SEE",
  "Intermediate",
  "Bachelors",
  "Post-Graduate-Diploma",
  "Masters",
  "MPhil",
  "PHD",
];

const experienceOptions = [
  "Fresher",
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "More than 5 years",
];

const salaryPeriodOptions = ["Weekly", "Monthly", "Yearly"];

const salaryAmountOptions = [
  "5K-10K",
  "10K",
  "10K-15K",
  "15K-20K",
  "20K-25K",
  "25K-30K",
  "30K-40K",
  "40K-50K",
  "50K-75K",
  "75K-100K",
  "100K-Above",
  "Negotiable",
];

const skillsOptions = [
  "Accounting",
  "Analytics & Data Science",
  "Counseling",
  "Data Visualization",
  "Digital Marketing",
  "Web Design",
  "Web Developer",
];

function JobForm({ showJobForm, setShowJobForm }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      values.jobProvider = user._id;
      values.status = "pending";
      dispatch(SetLoader(true));
      const response = await AddJob(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setShowJobForm(false);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const formRef = React.useRef(null);
  return (
    <div>
      <Modal
        title="Add Jobs"
        visible={showJobForm}
        onCancel={() => setShowJobForm(false)}
        centered
        width={"80%"}
        height={"80%"}
        okText="Post Job"
        onOk={() => {
          formRef.current.submit();
        }}
      >
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label="Company Name"
                name="companyname"
                rules={[
                  { required: true, message: "Please enter Company Name" },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Company's Email"
                name="companyemail"
                rules={[
                  { required: true, message: "Please enter Company's Email" },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="No of openings"
                name="openings"
                rules={[
                  { required: true, message: "Please enter No of openings" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label="Location"
                name="companylocation"
                rules={[{ required: true, message: "Please enter Location" }]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select Category" }]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={categoryOptions.map((category) => ({
                    label: category,
                    value: category,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[{ required: true, message: "Please select Duration" }]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={durationOptions.map((duration) => ({
                    label: duration,
                    value: duration,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label="Job Level"
                name="level"
                rules={[{ required: true, message: "Please select Job Level" }]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={levelOptions.map((level) => ({
                    label: level,
                    value: level,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Education required"
                name="education"
                rules={[
                  {
                    required: true,
                    message: "Please select Education required",
                  },
                ]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={educationOptions.map((education) => ({
                    label: education,
                    value: education,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "Please select Experience required",
                  },
                ]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={experienceOptions.map((experience) => ({
                    label: experience,
                    value: experience,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item
                label="Salary Period"
                name="salaryperiod"
                rules={[
                  { required: true, message: "Please select Salary Period" },
                ]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={salaryPeriodOptions.map((period) => ({
                    label: period,
                    value: period,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Salary Amount"
                name="salaryamount"
                rules={[
                  { required: true, message: "Please select Salary Amount" },
                ]}
              >
                <Select
                  className="h-[40px]"
                  defaultValue="--select--"
                  options={salaryAmountOptions.map((amount) => ({
                    label: amount,
                    value: amount,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Skills"
                name="skills"
                rules={[{ required: true, message: "Please select Skills" }]}
              >
                <Select
                  className="h-[40px]"
                  placeholder="choose the skills"
                  mode="multiple"
                  options={skillsOptions.map((skill) => ({
                    label: skill,
                    value: skill,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            rules={[{ required: true }]}
            label="Job Description"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Job Specification"
            name="specification"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default JobForm;
