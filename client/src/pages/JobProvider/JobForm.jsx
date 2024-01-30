import { Form, Input, Modal, Select, Tabs } from "antd";
import React from "react";

const skillsOptions = [
    "Accounting",
    "Analytics & Data Science",
    "Counseling",
    "Data Visualization",
    "Digital Marketing",
    "Web Design",
    "Web Developer"
]

function JobForm(showJobForm, setShowJobForm) {
  return (
    <div>
      <Modal
        title="Add Jobs"
        open={showJobForm}
        onCancel={() => setShowJobForm(false)}
        centered
        width={"90%"}
        okText="Post Job"
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Company Details" key="1">
            <Form layout="vertical">
              <Form.Item  rules={[{required: true}]}   label="Company Name" name="Companyname">
                <Input type="text" required></Input>
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Company's Email" name="Companyemail">
                <Input type="text" required></Input>
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Location" name="Companylocation">
                <Input type="text" required></Input>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Job Details" key="2">
            <Form layout="vertical">
              <Form.Item  rules={[{required: true}]}   label="No of openings" name="openings">
                <Input type="number" required></Input>
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Category" name="category" >
                <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "Accounting / Finance",
                      value: "Accounting / Finance",
                    },
                    {
                      label: "Architecture / Interior Design",
                      value: "Architecture / Interior Design",
                    },
                    {
                      label: "Banking / Insurance / Financial Services",
                      value: "Banking / Insurance / Financial Services",
                    },
                    {
                      label: "Commercial / Logistics / Supply Chain",
                      value: "Commercial / Logistics / Supply Chain",
                    },
                    {
                      label: "Construction / Engineering / Architects",
                      value: "Construction / Engineering / Architects",
                    },
                    {
                      label: "Creative / Content / Graphics / Video Editing",
                      value: "Creative / Content / Graphics / Video Editing",
                    },
                    {
                      label: "Hospitality / Tourism",
                      value: "Hospitality / Tourism",
                    },
                    {
                      label: "IT / Telecommunication",
                      value: "IT / Telecommunication",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Duration" name="duration">
              <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "14 Days",
                      value: "14 Days",
                    },
                    {
                      label: "30 Days",
                      value: "30 Days",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Job Level" name="level">
              <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "Entry Level",
                      value: "Entry Level",
                    },
                    {
                      label: "Junior Level",
                      value: "Junior Level",
                    },
                    {
                      label: "Senior Level",
                      value: "Senior Level",
                    },
                    {
                      label: "Mid Level",
                      value: "Mid Level",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Education required" name="education">
              <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "below SLC/SEE",
                      value: "below SLC/SEE",
                    },
                    {
                      label: "SLC/SEE",
                      value: "SLC/SEE",
                    },
                    {
                      label: "Intermediate",
                      value: "Intermediate",
                    },
                    {
                      label: "Bachelors",
                      value: "Bachelors",
                    },
                    {
                      label: "Post-Graduate-Diploma",
                      value: "Post-Graduate-Diploma",
                    },
                    {
                      label: "Masters",
                      value: "Masters",
                    },
                    {
                      label: "MPhil",
                      value: "MPhil",
                    },
                    {
                      label: "PHD",
                      value: "PHD",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Experience required" name="experience">
              <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "Fresher",
                      value: "Fresher",
                    },
                    {
                      label: "6 months",
                      value: "6 months",
                    },
                    {
                      label: "1 year",
                      value: "1 year",
                    },
                    {
                      label: "2 year",
                      value: "2 year",
                    },
                    {
                      label: "3 year",
                      value: "3 year",
                    },
                    {
                      label: "4 year",
                      value: "4 year",
                    },
                    {
                      label: "5 years",
                      value: "5 years",
                    },
                    {
                      label: "More than 5 years",
                      value: "More than 5 years",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Salary Period" name="salaryperiod">
              <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "Weekly",
                      value: "Weekly",
                    },
                    {
                      label: "Monthly",
                      value: "Monthly",
                    },
                    {
                      label: "Yearly",
                      value: "Yearly",
                    }
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Salary Amount" name="salaryamount">
              <Select
                  defaultValue="--select--"
                  options={[
                    {
                      label: "5K-10K",
                      value: "5K-10K",
                    },
                    {
                      label: "10K",
                      value: "10K",
                    },
                    {
                      label: "10K-15K",
                      value: "10K-15K",
                    },
                    {
                      label: "15K-20K",
                      value: "15K-20K",
                    },
                    {
                      label: "20K-25K",
                      value: "20K-25K",
                    },
                    {
                      label: "25K-30K",
                      value: "25K-30K",
                    },
                    {
                      label: "30K-40K",
                      value: "30K-40K",
                    },
                    {
                      label: "40K-50K",
                      value: "40K-50K",
                    },
                    {
                      label: "50K-75K",
                      value: "50K-75K",
                    },
                    {
                      label: "75K-100K",
                      value: "75K-100K",
                    },
                    {
                      label: "100K-Above",
                      value: "100K-Above",
                    },
                    {
                      label: "Negotiable",
                      value: "Negotiable",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item  rules={[{required: true}]}   label="Skills" name="skills">
              <Select
                  placeholder="choose the skills"
                  mode="multiple"
                  options={skillsOptions.map(skill => ({ label: skill, value:skill }))}
                />
              </Form.Item>
                  <Form.Item  rules={[{required: true}]}   label="Job Description"  name="description">
                  <Input.TextArea rows={4}/>
                  </Form.Item>
                  <Form.Item  rules={[{required: true}]}   label="Job Specification"  name="specification">
                  <Input.TextArea rows={4}/>
                  </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}

export default JobForm;
