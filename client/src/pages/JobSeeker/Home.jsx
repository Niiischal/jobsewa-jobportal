import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Jobs from "./Jobs";
import Resume from "./Resume";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "jobSeeker" && (
        <div>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Availabe Jobs" key="1">
              <Jobs />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Resume" key="2">
              <div className="flex justify-center items-center">
                <Resume />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Home;
