import { Col, Form, Input, Modal, Row, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostInterest } from "../../apicalls/interests";
import { SetLoader } from "../../redux/loadersSlice";

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

const titleOptions = [
  "Web Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Data Analyst",
  "Project Manager",
  "Accountant",
  "HR Executive",
  "Doctor",
  "Nurse",
  "Auditor",
  "Writer",
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

const skillsOptions = [
  "Accounting",
  "Analytics & Data Science",
  "Counseling",
  "Data Visualization",
  "Digital Marketing",
  "Web Design",
  "Web Developer",
];

function InterestForm({ showInterestForm, setShowInterestForm}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      values.jobSeeker = user._id;
      dispatch(SetLoader(true));
      const response = await PostInterest(values);
      if (response.success) {
        message.success(response.message);
        setShowInterestForm(false);
        dispatch(SetLoader(false))
      } else {
        message.error(response.message);
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
        open={showInterestForm}
        onCancel={() => setShowInterestForm(false)}
        centered
        width={"80%"}
        okText="Post Interest"
        onOk={() => {
          formRef.current.submit();
        }}
      >
        <div>
          <h1 className="text-xl font-semibold uppercase text-center">
            {" "}
            Add Interest{" "}
          </h1>
          <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please Provide your  Full Name!",
                    },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your Email" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[
                    { required: true, message: "Please enter your location" },
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  label="Education"
                  name="education"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Education",
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
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please select Category" },
                  ]}
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
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please select the title" },
                  ]}
                >
                  <Select
                    className="h-[40px]"
                    defaultValue="--select--"
                    options={titleOptions.map((title) => ({
                      label: title,
                      value: title,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  rules={[
                    {
                      required: true,
                      message: "Please select Experience",
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
              <Col span={12}>
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
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default InterestForm;
