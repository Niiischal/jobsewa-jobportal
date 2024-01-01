import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../apicalls/users";
import Navbar from "../components/Navbar";

const rules= [
  {
    required: true,
    message: "required",
  }
]

const Login = () => {
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success){
        message.success(response.message);
        localStorage.setItem("token", response.data)
      } else{
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <>
    <Navbar label="Signup"/>
    <div className="h-screen flex justify-center items-center">
    <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-primary ">
      <h1 className="text-[30px] my-2">Login</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" className="font-semibold" rules={rules}>
          <Input type=" email" placeholder="Enter Your Email"></Input>
        </Form.Item>
        <Form.Item label="Password" name="password" className="font-semibold" rules={rules}>
          <Input placeholder="Enter Your Password" type="password"></Input>
          {/* <li className="mt-2 font-semibold hover:text-primary">Forgot Password?</li> */}
        </Form.Item>
        <Button type="primary" className="bg-primary" htmlType="" block>
          Sign In
        </Button>
        <div className="mt-4 text-center text-base">
        <span>
            Not a Member?{" "}
          </span>
          <Link to="/register" className="text-primary hover:text-black">Create Account</Link>
        </div>
      </Form>
    </div>
  </div>
  </>
  )
}

export default Login
