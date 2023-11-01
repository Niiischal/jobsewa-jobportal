import { Button, Form } from "antd";
import Input from "antd/es/input/Input";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
    <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-[#2a68ff]">
      <h1 className="text-[30px] ">Login</h1>
      <Form layout="vertical">
        <Form.Item label="Email" name="email" className="font-semibold">
          <Input type=" email" placeholder="Enter Your Email"></Input>
        </Form.Item>
        <Form.Item label="Password" name="password" className="font-semibold">
          <Input placeholder="Enter Your Password" type="password"></Input>
          <li className="mt-3">Forgot Password?</li>
        </Form.Item>
        <Button type="primary" htmlType="" block>
          Sign In
        </Button>
        <div className="mt-4 text-center text-base">
        <span>
            Not a Member?{" "}
          </span>
        </div>
      </Form>
    </div>
  </div>
  )
}

export default Login
