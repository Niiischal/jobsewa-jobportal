import { Button, Col, DatePicker, Form, Input, Row, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GenerateResume } from "../apicalls/resumes";
import { SetLoader } from "../redux/loadersSlice";

function ResumeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      // Convert links, technicalSkills, softSkills to arrays of strings
      values.links = values.links.map((linkObj) => linkObj.link);
      values.technicalSkills = values.technicalSkills.map(
        (skillObj) => skillObj.skill
      );
      values.softSkills = values.softSkills.map((skillObj) => skillObj.skill);

      // Convert education, experience, projects, certificates to arrays of objects
      values.education = values.education.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        startYear: edu.startYear,
        endYear: edu.endYear,
      }));
      values.experience = values.experience.map((exp) => ({
        title: exp.title,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
      }));
      values.projects = values.projects.map((proj) => ({
        title: proj.title,
        description: proj.description,
        startDate: proj.startDate,
        endDate: proj.endDate,
        link: proj.link,
      }));
      values.certificates = values.certificates.map((cert) => ({
        title: cert.title,
        organization: cert.organization,
        date: cert.date,
        link: cert.link,
      }));
      const response = await GenerateResume(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition duration-300">
      <h1 className="flex justify-center items-center text-3xl">
        Generate Resume
      </h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={8}>
          {/* Full Name */}
          <Col span={8}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter Full Name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* Email */}
          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter Email" }]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>
          {/* Location */}
          <Col span={8}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please enter your Location" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          {/* Contact Number */}
          <Col span={8}>
            <Form.Item
              label="Contact Number"
              name="contact"
              rules={[
                { required: true, message: "Please enter your contact number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* About Me */}
          <Col span={8}>
            <Form.Item
              label="About Me"
              name="about"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          {/* Links */}
          <Col span={8}>
            <Form.List name="links">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Links" : ""}
                        name={[field.name, "link"]} // Ensure each field is named 'link'
                        fieldKey={[field.fieldKey, "link"]} // Ensure each field has a 'link' field key
                        rules={[
                          {
                            required: true,
                            message: "Please provide the link",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Links
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row gutter={8}>
          {/* Technical Skills */}
          <Col span={8}>
            <Form.List name="technicalSkills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Technical Skills" : ""}
                        name={[field.name, "skill"]} // Ensure each field is named 'skill'
                        fieldKey={[field.fieldKey, "skill"]} // Ensure each field has a 'skill' field key
                        rules={[
                          {
                            required: true,
                            message: "Please provide technical skill",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Technical Skill
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          {/* Soft Skills */}
          <Col span={8}>
            <Form.List name="softSkills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Soft Skills" : ""}
                        name={[field.name, "skill"]} // Ensure each field is named 'skill'
                        fieldKey={[field.fieldKey, "skill"]} // Ensure each field has a 'skill' field key
                        rules={[
                          {
                            required: true,
                            message: "Please provide soft skill",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Soft Skill
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          {/* Education */}
          <Col span={8}>
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Education" : ""}
                        name={[field.name]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide education details",
                          },
                        ]}
                      >
                        <Form.Item
                          name={[field.name, "degree"]}
                          fieldKey={[field.fieldKey, "degree"]}
                          rules={[
                            { required: true, message: "Degree is required" },
                          ]}
                        >
                          <Input placeholder="Degree" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "institution"]}
                          fieldKey={[field.fieldKey, "institution"]}
                          rules={[
                            {
                              required: true,
                              message: "Institution is required",
                            },
                          ]}
                        >
                          <Input placeholder="Institution" />
                        </Form.Item>
                        <div className="flex justify-between">
                          <Form.Item
                            name={[field.name, "startYear"]}
                            fieldKey={[field.fieldKey, "startYear"]}
                            rules={[
                              {
                                required: true,
                                message: "Start Year is required",
                              },
                            ]}
                          >
                            <DatePicker
                              picker="year"
                              placeholder="Start Year"
                            />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "endYear"]}
                            fieldKey={[field.fieldKey, "endYear"]}
                            rules={[
                              {
                                required: true,
                                message: "End Year is required",
                              },
                            ]}
                          >
                            <DatePicker picker="year" placeholder="End Year" />
                          </Form.Item>
                        </div>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Education
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.List name="experience">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Experience" : ""}
                        name={[field.name]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide experience details",
                          },
                        ]}
                      >
                        <Form.Item
                          name={[field.name, "title"]}
                          fieldKey={[field.fieldKey, "title"]}
                          rules={[
                            { required: true, message: "Title is required" },
                          ]}
                        >
                          <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "company"]}
                          fieldKey={[field.fieldKey, "company"]}
                          rules={[
                            {
                              required: true,
                              message: "Company is required",
                            },
                          ]}
                        >
                          <Input placeholder="Company" />
                        </Form.Item>
                        <div className="flex justify-between">
                          <Form.Item
                            name={[field.name, "startDate"]}
                            fieldKey={[field.fieldKey, "startDate"]}
                            rules={[
                              {
                                required: true,
                                message: "Start Date is required",
                              },
                            ]}
                          >
                            <DatePicker placeholder="Start Date" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "endDate"]}
                            fieldKey={[field.fieldKey, "endDate"]}
                            rules={[
                              {
                                required: true,
                                message: "End Date is required",
                              },
                            ]}
                          >
                            <DatePicker placeholder="End Date" />
                          </Form.Item>
                        </div>
                        <Form.Item
                          name={[field.name, "description"]}
                          fieldKey={[field.fieldKey, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Description is required",
                            },
                          ]}
                        >
                          <Input.TextArea placeholder="Description" />
                        </Form.Item>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Experience
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={8}>
            <Form.List name="projects">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Projects" : ""}
                        name={[field.name]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide project details",
                          },
                        ]}
                      >
                        <Form.Item
                          name={[field.name, "title"]}
                          fieldKey={[field.fieldKey, "title"]}
                          rules={[
                            { required: true, message: "Title is required" },
                          ]}
                        >
                          <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "description"]}
                          fieldKey={[field.fieldKey, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Description is required",
                            },
                          ]}
                        >
                          <Input.TextArea placeholder="Description" />
                        </Form.Item>
                        <div className="flex justify-between">
                          <Form.Item
                            name={[field.name, "startDate"]}
                            fieldKey={[field.fieldKey, "startDate"]}
                            rules={[
                              {
                                required: true,
                                message: "Start Date is required",
                              },
                            ]}
                          >
                            <DatePicker placeholder="Start Date" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "endDate"]}
                            fieldKey={[field.fieldKey, "endDate"]}
                            rules={[
                              {
                                required: true,
                                message: "End Date is required",
                              },
                            ]}
                          >
                            <DatePicker placeholder="End Date" />
                          </Form.Item>
                        </div>
                        <Form.Item
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                          rules={[
                            { required: true, message: "Link is required" },
                          ]}
                        >
                          <Input placeholder="Link" />
                        </Form.Item>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Project
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={8}>
            <Form.List name="certificates">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Col span={24} key={field.key}>
                      <Form.Item
                        {...field}
                        label={index === 0 ? "Certificates" : ""}
                        name={[field.name]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide certificate details",
                          },
                        ]}
                      >
                        <Form.Item
                          name={[field.name, "title"]}
                          fieldKey={[field.fieldKey, "title"]}
                          rules={[
                            { required: true, message: "Title is required" },
                          ]}
                        >
                          <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "organization"]}
                          fieldKey={[field.fieldKey, "organization"]}
                          rules={[
                            {
                              required: true,
                              message: "Organization is required",
                            },
                          ]}
                        >
                          <Input placeholder="Organization" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "date"]}
                          fieldKey={[field.fieldKey, "date"]}
                          rules={[
                            { required: true, message: "Date is required" },
                          ]}
                        >
                          <DatePicker placeholder="Date" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                          rules={[
                            { required: true, message: "Link is required" },
                          ]}
                        >
                          <Input placeholder="Link" />
                        </Form.Item>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" onClick={() => add()} block>
                        Add Certificate
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="mt-2 h-9 rounded bg-[primary] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out"
        >
          Generate Resume
        </Button>
      </Form>
    </div>
  );
}

export default ResumeForm;
