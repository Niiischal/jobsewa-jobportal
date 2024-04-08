import { Button, Form, Input, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apicalls/users";
import Navbar from "../components/Navbar";
import { SetLoader } from "../redux/loadersSlice";

const { TabPane } = Tabs;

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("jobSeeker"); 

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      // Make the API call with the selected tab
      const response = await RegisterUser({
        ...values,
        tab: selectedTab,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/jobseeker-home");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <div className="form-container p-5 rounded-sm w-[350px] border-solid border border-primary bg-[#fcfdfd] cursor-pointer shadow-lg hover:shadow-xl transition duration-300">
          <h1 className="text-[30px] my-2">Create an Account</h1>
          <Tabs defaultActiveKey="jobSeeker" onChange={setSelectedTab}>
            <TabPane tab="Job Seeker" key="jobSeeker">
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
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form>
            </TabPane>
            <TabPane tab="Job Provider" key="jobProvider">
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
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </Form>
            </TabPane>
          </Tabs>
          <div className="mt-4 text-center text-base">
            <span>Already have an account? </span>
            <Link to="/login" className="text-primary hover:text-black">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
