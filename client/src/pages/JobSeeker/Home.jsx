import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import AppliedJobs from "./AppliedJobs";
import Interest from "./Interest";
import Jobs from "./Jobs";
import Resume from "./Resume";
import SavedJobs from "./SavedJobs";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "jobSeeker" && (
        <div>
          <Jobs/>
          {/* <Tabs centered defaultActiveKey="1">
            <Tabs.TabPane tab="Availabe Jobs" key="1">
              <Jobs />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Resume" key="2">
              <div className="flex justify-center items-center">
                <Resume />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Saved Jobs" key="3">
              <SavedJobs />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Applied Jobs" key="4">
              <AppliedJobs/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Post Interest" key="5">
              <Interest/>
            </Tabs.TabPane>
          </Tabs> */}
        </div>
      )}
    </div>
  );
}

export default Home;
