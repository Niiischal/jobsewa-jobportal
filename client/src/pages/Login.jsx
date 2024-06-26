import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apicalls/users";
import Navbar from "../components/Navbar";
import { SetLoader } from "../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true))
      const response = await LoginUser(values);
      dispatch(SetLoader(false))
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/jobseeker-home";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
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
      <Navbar/>
      <div className="h-screen flex justify-center items-center">
        <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-primary bg-[#fcfdfd] cursor-pointer shadow-lg hover:shadow-xl transition duration-300">
          <h1 className="text-[30px] my-2">Login</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold"
              rules={rules}
            >
              <Input type=" email" placeholder="Enter Your Email"></Input>
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
              ></Input.Password>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
            <Link
              to="/forgotPassword"
              className="flex flex-col items-end text-black"
            >
              Forgot your Password?
            </Link>
            <div className="mt-4 text-center text-base">
              <span>Not a Member? </span>
              <Link to="/register" className="text-primary hover:text-black">
                Create Account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
