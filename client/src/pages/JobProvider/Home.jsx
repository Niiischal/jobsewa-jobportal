import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import JobApplication from "./JobApplicaton";
import Jobs from "./Jobs";
import SeekerInterests from "./SeekerInterests";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "jobProvider" && (
        <div className="pl-[1rem] pr-[1rem]">
          <Tabs defaultActiveKey="1" >
            <Tabs.TabPane
              tab={<span className="flex gap-2 items-center">Add Jobs</span>}
              key="1"
            >
              <Jobs />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>Job Applicants</span>} key="2">
              <JobApplication />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>Seeker's Interests</span>} key="3">
              <SeekerInterests />
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Home;
