import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import JobDetails from "./JobDetails";
import UserDetails from "./UserDetails";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
              {user.role === "admin" && (
          <div className="navigation pl-[2rem] pr-[2rem]">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Users" key="1">
                <UserDetails/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Jobs" key="2">
                <JobDetails/>
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
    </div>
  );
}

export default Home;
