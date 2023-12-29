import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../apicalls/signup";
import Navbar from "../components/Navbar";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Signup = () => {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-[#7a63f1]">
          <h1 className="text-[30px] my-2">Create an Account</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="name"
              className="font-semibold"
              rules={rules}
            >
              <Input placeholder="Enter Your Full Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold"
              rules={rules}
            >
              <Input type="email" placeholder="Enter Your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="font-semibold"
              rules={rules}
            >
              <Input placeholder="Enter Your Password" type="password" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="jobSeeker"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox>Job Seeker</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="jobProvider"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox>Job Provider</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
            <div className="mt-4 text-center text-base">
              <span>Already have an account? </span>
              <Link to="/login" className="text-[#7a63f1] hover:text-black">
                Log In
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
