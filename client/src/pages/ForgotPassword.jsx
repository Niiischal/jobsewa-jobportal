import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../apicalls/users";
import Navbar from "../components/Navbar";

function ForgotPassword() {
  const rules = [{ required: true, message: "This field is required" }];

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await forgotPassword(values);
      if (response.success) {
        message.success(response.message);
        navigate("/verifyOTP");
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
        <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-primary ">
          <h1 className="text-[30px] my-2">Forgot Password?</h1>
          <p className="font-medium text-base my-3">
            Enter your email to reset your password
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold"
              rules={rules}
            >
              <Input type=" email" placeholder="Enter Your Email"></Input>
            </Form.Item>
            <Button
              type="primary"
              className="bg-primary"
              htmlType="submit"
              block
            >
              Get OTP
            </Button>
            <div className="mt-4 text-center text-base">
              <Link to="/login" className="text-primary hover:text-black">
                Back to login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
