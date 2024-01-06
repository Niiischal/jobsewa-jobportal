import { Button, Form, Input, Radio, message } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apicalls/users";
import Navbar from "../components/Navbar";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Extract the selected role from the values object
      const selectedRole = values.role;

      // Make the API call with the extracted values
      const response = await RegisterUser({
        ...values,
        roles: [selectedRole],
      });

      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/jobseeker-home");
    }
  });

  return (
    <>
      <Navbar label="Login" />
      <div className="h-screen flex justify-center items-center">
        <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-primary">
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
              <Input.Password
                placeholder="Enter Your Password"
                type="password"
              />
            </Form.Item>
            <Form.Item
              label="Select Role"
              name="role"
              className="font-semibold"
              rules={rules}
            >
              <Radio.Group>
                <Radio value="jobSeeker">Job Seeker</Radio>
                <Radio value="jobProvider">Job Provider</Radio>
              </Radio.Group>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary"
              block
            >
              Sign Up
            </Button>
            <div className="mt-4 text-center text-base">
              <span>Already have an account? </span>
              <Link to="/login" className="text-primary hover:text-black">
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
