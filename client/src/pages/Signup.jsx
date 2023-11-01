import { Button, Form } from "antd";
import Input from "antd/es/input/Input";

const Signup = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="form-container p-5 rounded-sm w-[350px] border-2 border-[#2a68ff]">
        <h1 className="text-[30px] ">Create an Account</h1>
        <Form layout="vertical">
          <Form.Item label="Full Name" name="name" className="font-semibold">
            <Input placeholder="Enter Your Full Name"></Input>
          </Form.Item>
          <Form.Item label="Email" name="email" className="font-semibold">
            <Input type=" email" placeholder="Enter Your Email"></Input>
          </Form.Item>
          <Form.Item label="Password" name="password" className="font-semibold">
            <Input placeholder="Enter Your Password" type="password"></Input>
          </Form.Item>
          <Button type="primary" htmlType="" block>
            Sign Up
          </Button>
          <div className="mt-4 text-center text-base">
          <span>
              Already have an account?{" "}
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
