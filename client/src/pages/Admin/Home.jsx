import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user.role === "admin" && (
        <div className="navigation pl-[1rem] pr-[1rem]">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Dashboard" key="1">
              <Dashboard />
            </Tabs.TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Home;
