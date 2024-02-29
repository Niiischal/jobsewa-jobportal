import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

function ResumeForm() {
  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl">
        Generate Resume
      </h1>
      <Form layout="vertical">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter Full Name" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter Email" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please enter your Location" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label="Contact Number"
              name="contact"
              rules={[
                { required: true, message: "Please enter your contact number" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="About Me"
              name="about"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.List name="links">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={28} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Links" : ""}
                        name={[name, "links"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide the links",
                          },
                        ]}
                      >
                        <Input type="text" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
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
          <Col span={8}>
            <Form.List name="technicalSkills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={24} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Technical Skills" : ""}
                        name={[name, "technicalSkills"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide technical skills",
                          },
                        ]}
                      >
                        <Input type="text" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        Add Technical Skill
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={8}>
            <Form.List name="softSkills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={24} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Soft Skills" : ""}
                        name={[name, "softSkills"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide soft skills",
                          },
                        ]}
                      >
                        <Input type="text" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        Add Soft Skill
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={8}>
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={24} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Education" : ""}
                        name={[name, "education"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide education details",
                          },
                        ]}
                      >
                        <div className="flex flex-col gap-2">
                          <Input type="text" placeholder="Degree" />
                          <Input type="text" placeholder="Institution" />
                          <DatePicker.RangePicker
                            placeholder={["Start Year", "End Year"]}
                            format="YYYY"
                          />
                        </div>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
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
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={24} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Experience" : ""}
                        name={[name, "experience"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide experience details",
                          },
                        ]}
                      >
                        <div className="flex flex-col gap-2">
                          <Input type="text" placeholder="Title" />
                          <Input type="text" placeholder="Company" />
                          <DatePicker.RangePicker
                            placeholder={["Start Date", "End Date"]}
                          />
                          <Input.TextArea placeholder="Description" />
                        </div>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
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
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={24} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Projects" : ""}
                        name={[name, "projects"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide project details",
                          },
                        ]}
                      >
                        <div className="flex flex-col gap-2">
                          <Input type="text" placeholder="Title" />
                          <Input.TextArea placeholder="Description" />
                          <DatePicker.RangePicker
                            placeholder={["Start Date", "End Date"]}
                          />
                          <Input type="text" placeholder="Link" />
                        </div>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        Add Project
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Form.List>
          </Col>
          {/* Certificates */}
          <Col span={8}>
            <Form.List name="certificates">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Col span={24} key={key}>
                      <Form.Item
                        {...restField}
                        label={index === 0 ? "Certificates" : ""}
                        name={[name, "certificates"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide certificate details",
                          },
                        ]}
                      >
                        <div className="flex flex-col gap-2">
                          <Input type="text" placeholder="Title" />
                          <Input type="text" placeholder="Organization" />
                          <DatePicker placeholder="Date" />
                          <Input type="text" placeholder="Link" />
                        </div>
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="link"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  ))}
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
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
