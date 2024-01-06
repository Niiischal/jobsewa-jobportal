import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VerificationOTP } from "../apicalls/users";
import Navbar from "../components/Navbar";
function OTP() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const rules = [{ required: true, message: "This field is required" }];

  const onFinish = async () => {
    try {
      const response = await VerificationOTP({ email, otp, newPassword });
      if (response.success) {
        message.success(response.message);
        // navigate the user to login if the password is updated successfully
        navigate("/login");
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
          <h1 className="text-[30px] my-2">OTP Verification</h1>
          <p className="font-medium text-base my-3">
            Enter the provided OTP to reset password
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold"
              rules={rules}
            >
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="OTP"
              name="otp"
              className="font-semibold"
              rules={rules}
            >
              <Input
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              className="font-semibold"
              rules={rules}
            >
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Button
              type="primary"
              className="bg-primary"
              htmlType="submit"
              block
            >
              Reset Password
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

export default OTP;
