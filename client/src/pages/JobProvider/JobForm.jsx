import { Col, Form, Input, Modal, Row, Select, Tabs } from "antd";
import React from "react";

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
  "2 year",
  "3 year",
  "4 year",
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

function JobForm(showJobForm, setShowJobForm) {
  return (
    <div>
      <Modal
        title="Add Jobs"
        open={showJobForm}
        onCancel={() => setShowJobForm(false)}
        centered
        width={"80%"}
        height={"80%"}
        okText="Post Job"
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Company Details" key="1">
            <Form layout="vertical">
              <Form.Item
                rules={[{ required: true }]}
                label="Company Name"
                name="Companyname"
              >
                <Input type="text" required></Input>
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label="Company's Email"
                name="Companyemail"
              >
                <Input type="text" required></Input>
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label="Location"
                name="Companylocation"
              >
                <Input type="text" required></Input>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Job Details" key="2">
            <Form layout="vertical">
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item
                    rules={[{ required: true }]}
                    label="No of openings"
                    name="openings"
                  >
                    <Input type="number" required></Input>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    rules={[{ required: true }]}
                    label="Category"
                    name="category"
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
              </Row>
              <Form.Item
                rules={[{ required: true }]}
                label="Duration"
                name="duration"
              >
                <Select
                  defaultValue="--select--"
                  options={durationOptions.map((duration) => ({
                    label: duration,
                    value: duration,
                  }))}
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label="Job Level"
                name="level"
              >
                <Select
                  defaultValue="--select--"
                  options={levelOptions.map((level) => ({
                    label: level,
                    value: level,
                  }))}
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label="Education required"
                name="education"
              >
                <Select
                  defaultValue="--select--"
                  options={educationOptions.map((education) => ({
                    label: education,
                    value: education,
                  }))}
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true }]}
                label="Experience required"
                name="experience"
              >
                <Select
                  defaultValue="--select--"
                  options={experienceOptions.map((experience) => ({
                    label: experience,
                    value: experience,
                  }))}
                />
              </Form.Item>

              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item
                    rules={[{ required: true }]}
                    label="Salary Period"
                    name="salaryperiod"
                  >
                    <Select
                      defaultValue="--select--"
                      options={salaryPeriodOptions.map((period) => ({
                        label: period,
                        value: period,
                      }))}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    rules={[{ required: true }]}
                    label="Salary Amount"
                    name="salaryamount"
                  >
                    <Select
                      defaultValue="--select--"
                      options={salaryAmountOptions.map((amount) => ({
                        label: amount,
                        value: amount,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                rules={[{ required: true }]}
                label="Skills"
                name="skills"
              >
                <Select
                  placeholder="choose the skills"
                  mode="multiple"
                  options={skillsOptions.map((skill) => ({
                    label: skill,
                    value: skill,
                  }))}
                />
              </Form.Item>
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
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}

export default JobForm;
